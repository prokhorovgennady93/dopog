import { NextResponse } from "next/server";
import { auth } from "@/../auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { userName, courseIds } = await req.json();
    
    const dbUser = await db.user.findUnique({
      where: { id: session.user.id }
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Default pricing: Base = 5000, Others = 1500
    const prices: Record<string, number> = {
      "base": 5000,
      "tanks": 1500,
      "class1": 1500,
      "class7": 1500
    };

    const ids: string[] = JSON.parse(courseIds);
    let total = 0;
    ids.forEach(id => {
      total += prices[id] || 1500;
    });

    const order = await db.order.create({
      data: {
        userId: session.user.id,
        userName,
        userPhone: dbUser.phone || "",
        courseIds,
        totalAmount: total,
        status: "NEW",
        isSentToDashboard: true
      }
    });

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("CRITICAL: Order creation failed:", {
      message: error.message,
      stack: error.stack,
      userId: session?.user?.id
    });
    return NextResponse.json({ 
      error: "Server error", 
      details: error.message 
    }, { status: 500 });
  }
}
