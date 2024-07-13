import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const author = await prisma.author.findUnique({
    where: { id: Number(id) },
  });
  if (!author)
    return NextResponse.json({ error: "Author not found" }, { status: 404 });
  return NextResponse.json(author);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const data = await req.json();
  const author = await prisma.author.update({
    where: { id: Number(id) },
    data,
  });
  return NextResponse.json(author);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  await prisma.author.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({ message: "Author deleted" });
}
