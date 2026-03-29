import { auth } from "@/../auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { code } = await req.json();
    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    // 1. Find the promo code
    const promo = await db.promoCode.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        usedByUser: true
      }
    });

    if (!promo) {
      return NextResponse.json({ error: "Промокод не найден" }, { status: 404 });
    }

    // 2. Check usage
    if (promo.usedByUserId) {
      return NextResponse.json({ error: "Этот промокод уже активирован" }, { status: 400 });
    }

    if (promo.usedCount >= promo.maxUses) {
       return NextResponse.json({ error: "Превышен лимит использований" }, { status: 400 });
    }

    if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) {
      return NextResponse.json({ error: "Срок действия промокода истек" }, { status: 400 });
    }

    // 3. Apply the logic based on type
    const userId = session.user.id as string;

    if (promo.type === "FULL") {
        // Grant full access
        await db.user.update({
          where: { id: userId },
          data: {
            hasFullAccess: true,
            isPremium: true,
            fullAccessExpiresAt: promo.expiresAt || null
          }
        });
    } else if (promo.type === "COURSE" && promo.courseId) {
        // Create a specific purchase
        await db.purchase.create({
           data: {
             userId,
             courseId: promo.courseId,
             expiresAt: promo.expiresAt || null
           }
        });
    }

    // 4. Record redemption
    await db.promoCode.update({
      where: { id: promo.id },
      data: {
        usedByUserId: userId,
        usedCount: { increment: 1 }
      }
    });

    return NextResponse.json({ success: true, message: "Промокод успешно активирован!" });
  } catch (error) {
    console.error("Redemption error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
