const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *      schemas:
 *          User:
 *              type: object
 *              required:
 *                  - name
 *                  - email
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The autogenerated id of user
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *              example:
 *                  id: 1
 *                  name: 'Mangalam Raj'
 *                  email: 'mango.26june@gmail.com'
 */

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User management
 */

/**
 * @swagger
 * /users:
 *  post:
 *      summary: Add a new user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: The user was successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: Some Server Error
 */
router.post("/",async(req,res)=>{
    const {name, email} = req.body;
    try{
        const user = await prisma.user.create({
            data:{name,email},
        })
        res.json(user);
    }catch(err){
        res.status(500).json({err:err.message});
    }
});

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Returns the list of all the users
 *      tags: [User]
 *      responses:
 *          200:
 *              description: The list of the users
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 */
router.get('/',async(req,res)=>{
    try{
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    }catch(err){
        console.log(err);
        res.status(500).json({err:"Error while fetching the user data"});
    }
});

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      summary: Get user details by id
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: The user id
 *      responses:
 *          200:
 *              description: The user description by id
 *              content:     
 *                  application/json:
 *                      schema:
 *                          $ref:  '#/components/schemas/User'
 *          400:
 *              description: The user was not found
 */
router.get('/:id',async(req,res)=>{
    const {id} = req.params;
    try{
        const user = await prisma.user.findUnique({
            where:{id: parseInt(id)}
        });
        if(!user){
            return res.status(404).json({error: "user not found"})
        }
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(500).json({err:"Error in fetching user data"});
    }
})

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update the user by the id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some error happened
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          name,
          email,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(500).json({ error: 'An error occurred while updating the user' });
      }
    }
  });
  
  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Remove the user by id
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: The user id
   *     responses:
   *       200:
   *         description: The user was deleted
   *       404:
   *         description: The user was not found
   */
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(500).json({ error: 'An error occurred while deleting the user' });
      }
    }
  });
  
module.exports = router;