import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [orders, licenses] = await Promise.all([
    prisma.order.findMany({ where: { userId: (session.user as any).id }, orderBy: { createdAt: "desc" } }),
    prisma.license.findMany({ where: { userId: (session.user as any).id }, orderBy: { createdAt: "desc" } }),
  ]);
  return NextResponse.json({ orders, licenses });
}