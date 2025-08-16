import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string }}) {
  const b = await prisma.block.findUnique({ where: { id: params.id } });
  return NextResponse.json(b);
}
export async function PATCH(req: Request, { params }: { params: { id: string }}) {
  const body = await req.json();
  const b = await prisma.block.update({ where: { id: params.id }, data: body });
  return NextResponse.json(b);
}
export async function DELETE(_: Request, { params }: { params: { id: string }}) {
  await prisma.block.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
