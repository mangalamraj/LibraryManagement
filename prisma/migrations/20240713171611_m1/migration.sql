-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "publication_date" TIMESTAMP(3) NOT NULL,
    "genre" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Borrowing" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "borrow_date" TIMESTAMP(3) NOT NULL,
    "return_date" TIMESTAMP(3),

    CONSTRAINT "Borrowing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
