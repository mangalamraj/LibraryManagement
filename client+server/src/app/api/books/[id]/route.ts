import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const book = await prisma.book.findUnique({
    where: { id: Number(id) },
  });
  if (!book)
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  return NextResponse.json(book);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const data = await req.json();
  const book = await prisma.book.update({
    where: { id: Number(id) },
    data,
  });
  return NextResponse.json(book);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  await prisma.book.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({ message: "Book deleted" });
}
