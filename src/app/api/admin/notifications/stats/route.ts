import { NextResponse } from "next/server";
import { auth } from "@/../auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Get count of "NEW" status orders (applications)
    const unreadCount = await db.order.count({
      where: { status: "NEW" }
    });

    // 2. Get count of unpaid orders
    const unpaidCount = await db.order.count({
      where: { isPaid: false }
    });

    // 3. Get the ID and timestamp of the latest order
    const latestOrder = await db.order.findFirst({
      orderBy: { createdAt: "desc" },
      select: { id: true, createdAt: true, userName: true }
    });

    // 4. Get the ID and timestamp of the latest PAID order
    const latestPayment = await db.order.findFirst({
      where: { isPaid: true },
      orderBy: { updatedAt: "desc" },
      select: { id: true, updatedAt: true, userName: true, totalAmount: true }
    });

    return NextResponse.json({
      unreadCount,
      unpaidCount,
      totalBadgeCount: unreadCount + (unpaidCount > 0 ? 1 : 0), // Adjust logic as needed
      latestOrder,
      latestPayment
    });
  } catch (error) {
    console.error("[API] Admin Notification Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
