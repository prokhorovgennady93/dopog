import webpush from 'web-push';
import { db } from './db';

const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  privateKey: process.env.VAPID_PRIVATE_KEY!,
};

if (vapidKeys.publicKey && vapidKeys.privateKey) {
  webpush.setVapidDetails(
    'mailto:znania.group@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );
}

export async function sendPushNotification(userId: string, title: string, body: string, url: string = '/') {
  try {
    const subscriptions = await db.pushSubscription.findMany({
      where: { userId }
    });

    if (subscriptions.length === 0) return;

    const payload = JSON.stringify({
      title,
      body,
      url,
      icon: '/icon-192x192.png'
    });

    const results = await Promise.allSettled(
      subscriptions.map(async (sub) => {
        console.log(`[PushService] Attempting to send to endpoint: ${sub.endpoint.substring(0, 30)}...`);
        return webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth
            }
          },
          payload
        );
      })
    );

    // Clean up expired subscriptions
    const expiredEndpoints: string[] = [];
    results.forEach((result, index) => {
      const subId = subscriptions[index].id;
      const endpoint = subscriptions[index].endpoint;

      if (result.status === 'rejected') {
        const error = result.reason as any;
        console.error(`[PushService] Failed to send to ${subId}. Status: ${error.statusCode}. Reason: ${error.body || error.message}`);
        
        if (error.statusCode === 404 || error.statusCode === 410) {
          expiredEndpoints.push(endpoint);
        }
      } else {
        console.log(`[PushService] Successfully sent to subscription ${subId}`);
      }
    });

    if (expiredEndpoints.length > 0) {
      await db.pushSubscription.deleteMany({
        where: { endpoint: { in: expiredEndpoints } }
      });
      console.log(`[PushService] Deleted ${expiredEndpoints.length} expired subscriptions`);
    }

  } catch (error) {
    console.error('[PushService] Error sending notifications:', error);
  }
}

export async function sendPushToAdmin(title: string, body: string, url: string = '/admin/orders') {
  try {
    const admins = await db.user.findMany({
      where: { isAdmin: true },
      select: { id: true }
    });

    for (const admin of admins) {
      await sendPushNotification(admin.id, title, body, url);
    }
  } catch (error) {
    console.error('[PushService] Error sending to admins:', error);
  }
}
