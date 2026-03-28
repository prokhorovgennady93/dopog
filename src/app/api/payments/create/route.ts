import { NextResponse } from "next/server";
import { auth } from "@/../auth";
import { createPayment } from "@/lib/payments";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const type = body.type || "full_access";
    const courseId = body.courseId;
    const returnUrl = body.returnUrl;

    const amount = type === "full_access" ? 199 : 99;
    const description =
      type === "full_access"
        ? "ДОПОГ 2026: Полный доступ ко всем курсам"
        : `ДОПОГ 2026: Доступ к курсу`;

    const payment = await createPayment({
      amount,
      description,
      type,
      courseId,
      returnUrl,
      metadata: { userId: session.user.id },
    });

    return NextResponse.json({ url: payment.confirmation_url });
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json({ error: "Could not create payment session" }, { status: 500 });
  }
}
