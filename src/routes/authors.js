const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - name
 *         - birthdate
 *         - bio
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the author
 *         name:
 *           type: string
 *         birthdate:
 *           type: string
 *           format: date
 *         bio:
 *           type: string
 *       example:
 *         id: 1
 *         name: 'Chetan Bhagat'
 *         birthdate: '2001-06-26T00:00:00Z'
 *         bio: 'An Indian novelist.'
 */

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Author management
 */

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Add a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: The author was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       500:
 *         description: Some server error
 */
router.post("/", async (req, res) => {
  const { name, birthdate, bio } = req.body;
  try {
    const author = await prisma.author.create({
      data: { name, birthdate, bio },
    });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of all authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 */
router.get("/", async (req, res) => {
  try {
    const authors = await prisma.author.findMany();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The author ID
 *     responses:
 *       200:
 *         description: Author details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: Author not found
 *       500:
 *         description: Some server error
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const author = await prisma.author.findUnique({
      where: { id: Number(id) },
    });
    if (author) {
      res.json(author);
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The author ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: The author was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: Author not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, birthdate, bio } = req.body;
  try {
    const author = await prisma.author.update({
      where: { id: Number(id) },
      data: { name, birthdate, bio },
    });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The author ID
 *     responses:
 *       204:
 *         description: The author was successfully deleted
 *       404:
 *         description: Author not found
 *       500:
 *         description: Some server error
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.author.delete({ where: { id: Number(id) } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
