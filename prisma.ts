import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [games, incidents] = await Promise.all([
    prisma.gameStatus.findMany({ orderBy: { name: "asc" } }),
    prisma.incident.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
  ]);
  const online = games.filter((g) => g.status === "ONLINE").length;
  const maintenance = games.filter((g) => g.status === "MAINTENANCE").length;
  const activeIncidents = incidents.filter((i) => i.status !== "RESOLVED").length;
  return NextResponse.json({ overview: { online, maintenance, incidents: activeIncidents, uptime: "99.97%" }, games, incidents });
}