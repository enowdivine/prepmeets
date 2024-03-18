import express, { Router } from "express";
import Conversations from "./conversation.controller";
import verifyToken from "../../middleware/auth/verifyToken";

const router: Router = express.Router();
const conversations = new Conversations();

/**
 * @swagger
 * components:
 *  schemas:
 *      Conversation:
 *         type: object
 *         required:
 *              - senderId
 *              - receiverId
 *         properties:
 *              senderId:
 *                 type: string
 *                 description: sender ID
 *              receiverId:
 *                 type: string
 *                 description: receiver ID
 *              senderRole:
 *                 type: string
 *                 description: senderRole
 *              receiverRole:
 *                 type: string
 *                 description: receiverRole
 */

/**
 * @swagger
 * tags:
 *  name: Conversation
 *  description: The Conversation managing API
 */

/**
 * @swagger
 * /api/v1/conversations/create:
 *   post:
 *      summary: create a new conversation
 *      tags: [Conversation]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Conversation'
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Conversation'
 *          500:
 *              description: an error occured
 */
router.post("/create", verifyToken, conversations.createConversation);

/**
 * @swagger
 * /api/v1/conversations:
 *   get:
 *      summary: get user conversations
 *      tags: [Conversation]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: user id
 *      responses:
 *          200:
 *              description: returns array of user conversations
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          $ref: '#/components/schemas/Conversation'
 *          404:
 *              description: conversations not found
 */
router.get("/", verifyToken, conversations.getUserConversations);

export default router;
