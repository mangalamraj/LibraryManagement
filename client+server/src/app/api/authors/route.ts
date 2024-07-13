import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const authors = await prisma.author.findMany();
  return NextResponse.json(authors);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const author = await prisma.author.create({ data });
  return NextResponse.json(author);
}
