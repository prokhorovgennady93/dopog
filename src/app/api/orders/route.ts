import { NextResponse } from "next/server";
import { auth } from "@/../auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const status = searchParams.get("status");
  const isPaid = searchParams.get("isPaid");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const where: any = {};
  if (id) where.id = id;
  if (status && status !== "ALL") where.status = status;
  if (isPaid === "true") where.isPaid = true;
  if (isPaid === "false") where.isPaid = false;
  
  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) where.createdAt.gte = new Date(startDate);
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      where.createdAt.lte = end;
    }
  }

  try {
    const orders = await db.order.findMany({
      include: {
        user: {
          select: {
            examAttempts: {
              select: {
                course: { select: { slug: true } },
                isPassed: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Order listing error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, ...data } = await req.json();
    
    // Calculate total if price-related fields change
    if (data.courseIds || data.discountPercent !== undefined || data.deliveryCost !== undefined) {
      const current = await db.order.findUnique({ where: { id } });
      if (current) {
        const ids = JSON.parse(data.courseIds || current.courseIds);
        const discount = data.discountPercent !== undefined ? data.discountPercent : current.discountPercent;
        const delivery = data.deliveryCost !== undefined ? data.deliveryCost : current.deliveryCost;
        
        const prices: Record<string, number> = {
          "base": 5000,
          "tanks": 1500,
          "class1": 1500,
          "class7": 1500
        };

        let coursesTotal = 0;
        ids.forEach((id: string) => {
          coursesTotal += prices[id] || 1500;
        });

        const discountedCourses = coursesTotal * (1 - discount / 100);
        data.totalAmount = discountedCourses + delivery;
      }
    }

    const order = await db.order.update({
      where: { id },
      data
    });
    return NextResponse.json(order);
  } catch (error) {
    console.error("Order update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
