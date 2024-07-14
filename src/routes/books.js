const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author_id
 *         - publication_date
 *         - genre
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *         author_id:
 *           type: integer
 *         publication_date:
 *           type: string
 *           format: date
 *         genre:
 *           type: string
 *         status:
 *           type: string
 *           enum: [available, borrowed]
 *       example:
 *         id: 1
 *         title: 'Half Girlfriend'
 *         author_id: 1
 *         publication_date: '1925-04-10T00:00:00Z'
 *         genre: 'Novel'
 *         status: 'available'
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */
router.post("/", async (req, res) => {
  const { title, author_id, publication_date, genre, status } = req.body;
  try {
    const book = await prisma.book.create({
      data: { title, author_id, publication_date, genre, status },
    });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/", async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Some server error
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({ where: { id: Number(id) } });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author_id, publication_date, genre, status } = req.body;
  try {
    const book = await prisma.book.update({
      where: { id: Number(id) },
      data: { title, author_id, publication_date, genre, status },
    });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book ID
 *     responses:
 *       204:
 *         description: The book was successfully deleted
 *       404:
 *         description: Book not found
 *       500:
 *         description: Some server error
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.book.delete({ where: { id: Number(id) } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
