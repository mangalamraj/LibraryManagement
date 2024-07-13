import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const borrowings = await prisma.borrowing.findMany({
    include: {
      user: true,
      book: true,
    },
  });
  return NextResponse.json(borrowings);
}

export async function POST(req: NextRequest) {
  const { user_id, book_id, borrow_date, return_date } = await req.json();
  try {
    if (return_date) {
      // Return book
      const borrowing = await prisma.borrowing.updateMany({
        where: {
          user_id,
          book_id,
          return_date: null,
        },
        data: {
          return_date: new Date(return_date),
        },
      });
      return NextResponse.json(borrowing);
    } else {
      // Borrow book
      const borrowing = await prisma.borrowing.create({
        data: {
          user_id,
          book_id,
          borrow_date: new Date(borrow_date),
        },
      });
      return NextResponse.json(borrowing);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
