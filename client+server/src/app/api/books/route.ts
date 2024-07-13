import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const books = await prisma.book.findMany();
  return NextResponse.json(books);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const book = await prisma.book.create({ data });
  return NextResponse.json(book);
}
