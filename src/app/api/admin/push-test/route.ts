import { NextResponse } from 'next/server';
import { auth } from '@/../auth';
import { sendPushNotification } from '@/lib/push-service';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id || !session.user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await sendPushNotification(
      session.user.id,
      "Тестовое уведомление 🔔",
      "Если вы это видите, значит Remote Push работает корректно!",
      "/admin"
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[PushTest] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
