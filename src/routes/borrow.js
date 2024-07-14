const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   schemas:
 *     Borrowing:
 *       type: object
 *       required:
 *         - user_id
 *         - book_id
 *         - borrow_date
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the borrowing record
 *         user_id:
 *           type: integer
 *         book_id:
 *           type: integer
 *         borrow_date:
 *           type: string
 *           format: date
 *         return_date:
 *           type: string
 *           format: date
 *       example:
 *         id: 1
 *         user_id: 1
 *         book_id: 1
 *         borrow_date: '2024-01-01'
 *         return_date: '2024-01-10'
 */

/**
 * @swagger
 * tags:
 *   name: Borrowing
 *   description: Borrowing management
 */

/**
 * @swagger
 * /borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Borrowing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - book_id
 *             properties:
 *               user_id:
 *                 type: integer
 *               book_id:
 *                 type: integer
 *             example:
 *               user_id: 1
 *               book_id: 1
 *     responses:
 *       200:
 *         description: The book was successfully borrowed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Borrowing'
 *       500:
 *         description: Some server error
 */
router.post('/', async (req, res) => {
  const { user_id, book_id } = req.body;
  try {
    const borrowing = await prisma.borrowing.create({
      data: { user_id, book_id, borrow_date: new Date() },
    });
    await prisma.book.update({
      where: { id: book_id },
      data: { status: 'borrowed' },
    });
    res.json(borrowing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /borrow/return:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Borrowing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - book_id
 *             properties:
 *               user_id:
 *                 type: integer
 *               book_id:
 *                 type: integer
 *             example:
 *               user_id: 1
 *               book_id: 1
 *     responses:
 *       200:
 *         description: The book was successfully returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Borrowing'
 *       500:
 *         description: Some server error
 */
router.post('/return', async (req, res) => {
  const { user_id, book_id } = req.body;
  try {
    const borrowing = await prisma.borrowing.updateMany({
      where: { user_id, book_id, return_date: null },
      data: { return_date: new Date() },
    });
    await prisma.book.update({
      where: { id: book_id },
      data: { status: 'available' },
    });
    res.json(borrowing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /borrow/borrowed:
 *   get:
 *     summary: Get a list of all borrowed books and the respective users
 *     tags: [Borrowing]
 *     responses:
 *       200:
 *         description: List of all borrowed books and users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Borrowing'
 */
router.get('/borrowed', async (req, res) => {
  try {
    const borrowings = await prisma.borrowing.findMany({
      where: { return_date: null },
      include: { user: true, book: true },
    });
    res.json(borrowings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
