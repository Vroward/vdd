import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  department: z.string().min(1),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(5000),
  orderId: z.string().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const tickets = await prisma.ticket.findMany({
    where: { userId: (session.user as any).id },
    include: { replies: { orderBy: { createdAt: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(tickets);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const result = schema.safeParse(body);
  if (!result.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  const ticket = await prisma.ticket.create({
    data: {
      ticketId: `NV-SUP-${Math.floor(Math.random() * 900000 + 100000)}`,
      userId: (session.user as any).id,
      department: result.data.department,
      subject: result.data.subject,
      message: result.data.message,
      orderId: result.data.orderId || null,
      status: "OPEN",
    },
  });
  return NextResponse.json(ticket);
}