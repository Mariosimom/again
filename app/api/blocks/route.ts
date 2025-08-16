import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const blocks = await prisma.block.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(blocks);
}

export async function POST(req: Request) {
  const body = await req.json();
  const created = await prisma.block.create({ data: body });
  return NextResponse.json(created);
}

export async function PUT(req: Request) {
  const body = await req.json();
  // expects array of {id, order}
  const tx = await prisma.$transaction(
    body.map((b: any) => prisma.block.update({ where: { id: b.id }, data: { order: b.order } }))
  );
  return NextResponse.json({ ok: true, count: tx.length });
}
