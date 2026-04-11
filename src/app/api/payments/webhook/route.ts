import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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
      // Create a Purchase record for the specific course
      await db.purchase.upsert({
        where: { userId_courseId: { userId, courseId } },
        create: { userId, courseId, expiresAt },
        update: { expiresAt },
      });
      console.log(`[Webhook] User ${userId} purchased course ${courseId} until ${expiresAt.toISOString()}`);
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Failed to process payment webhook" }, { status: 500 });
  }
}
