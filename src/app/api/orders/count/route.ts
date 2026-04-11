import { NextResponse } from "next/server";
import { auth } from "@/../auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ count: 0 });
  }

  try {
    const count = await db.order.count({
      where: { status: "NEW" }
    });
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ count: 0 });
  }
}
