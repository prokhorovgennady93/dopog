import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendPushNotification, sendPushToAdmin } from "@/lib/push-service";

export async function POST(req: Request) {
  try {
    const { paymentId, userId, status = "succeeded", type, courseId, orderId } = await req.json();

    if (status !== "succeeded" || !userId) {
      return NextResponse.json({ success: false, message: "Invalid payment status or userId" });
    }

    const expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // +90 days

    if (type === "kit_order" && orderId) {
      await db.order.update({
        where: { id: orderId },
        data: { isPaid: true }
      });
      console.log(`[Webhook] Order ${orderId} marked as PAID for user ${userId}`);
    } else if (type === "single_course" && courseId) {
      // Find course by ID or slug to get the real CUID
      const course = await db.course.findFirst({
        where: {
          OR: [
            { id: courseId },
            { slug: courseId }
          ]
        }
      });

      if (course) {
        // Create a Purchase record for the specific course using is real ID
        await db.purchase.upsert({
          where: { userId_courseId: { userId, courseId: course.id } },
          create: { userId, courseId: course.id, expiresAt },
          update: { expiresAt },
        });
        console.log(`[Webhook] User ${userId} purchased course ${course.slug} (${course.id}) until ${expiresAt.toISOString()}`);
      } else {
        console.warn(`[Webhook] Course not found for ID/Slug: ${courseId}`);
      }
    } else {
      // Full access — set hasFullAccess + expiration
      await db.user.update({
        where: { id: userId },
        data: {
          hasFullAccess: true,
          fullAccessExpiresAt: expiresAt,
        },
      });
      console.log(`[Webhook] User ${userId} now has Full Access until ${expiresAt.toISOString()}`);
    }

    // --- PUSH NOTIFICATIONS ---
    try {
      if (type === "single_course" && courseId) {
        await sendPushNotification(
          userId,
          "Курс активирован! 🚛",
          "Ваш доступ к Базовому курсу успешно открыт. Приступайте к обучению!",
          "/dashboard"
        );
      } else if (type === "kit_order") {
        await sendPushNotification(
          userId,
          "Заказ оплачен! 📦",
          "Мы получили оплату за комплект документов и скоро начнем подговку.",
          "/admin/orders" // Or user orders page if exists
        );
      }

      // Always notify admin
      await sendPushToAdmin(
        "Оплата получена! 💳",
        `Пользователь ${userId} совершил оплату (${type})`,
        "/admin/orders"
      );
    } catch (pushError) {
      console.error("[Webhook] Push notification error:", pushError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Failed to process payment webhook" }, { status: 500 });
  }
}
