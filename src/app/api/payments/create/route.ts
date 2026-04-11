import { NextResponse } from "next/server";
import { auth } from "@/../auth";
import { createPayment } from "@/lib/payments";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const type = body.type || "full_access";
    const courseId = body.courseId;
    const orderId = body.orderId;
    const returnUrl = body.returnUrl;

    let amount = type === "full_access" ? 199 : 99;
    let description =
      type === "full_access"
        ? "ДОПОГ 2026: Полный доступ ко всем курсам"
        : `ДОПОГ 2026: Доступ к курсу`;

    if (type === "kit_order" && orderId) {
      const order = await db.order.findUnique({ where: { id: orderId } });
      if (order) {
        amount = order.totalAmount;
        description = `Комплект документов ДОПОГ (Заказ #${orderId.slice(-6)})`;
      } else {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }
    }

    const payment = await createPayment({
      amount,
      description,
      type: type as any,
      courseId,
      orderId,
      returnUrl,
      metadata: { userId: session.user.id, orderId },
    });

    return NextResponse.json({ url: payment.confirmation_url });
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json({ error: "Could not create payment session" }, { status: 500 });
  }
}
