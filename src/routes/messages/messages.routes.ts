import express, { Router } from "express";
import Messages from "./messages.controller";
import verifyToken from "../../middleware/auth/verifyToken";

const router: Router = express.Router();
const messages = new Messages();

/**
 * @swagger
 * components:
 *  schemas:
 *      Message:
 *         type: object
 *         required:
 *              - conversationId
 *              - senderId
 *              - receiverId
 *              - message
 *         properties:
 *              conversationId:
 *                 type: string
 *                 description: conversation ID
 *              senderId:
 *                 type: string
 *                 description: sender ID
 *              receiverId:
 *                 type: string
 *                 description: receiver ID
 *              message:
 *                 type: string
 *                 description: message
 */

/**
 * @swagger
 * tags:
 *  name: Message
 *  description: The Message managing API
 */

/**
 * @swagger
 * /api/v1/messages/create:
 *   post:
 *      summary: create a new message
 *      tags: [Message]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Message'
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Message'
 *          500:
 *              description: an error occured
 */
router.post("/create", verifyToken, messages.newMessage);

/**
 * @swagger
 * /api/v1/messages/{id}:
 *   get:
 *      summary: get conversation messages
 *      tags: [Message]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: conversation id
 *      responses:
 *          200:
 *              description: returns array of expert messages
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          $ref: '#/components/schemas/Message'
 *          404:
 *              description: messages not found
 */
router.get("/:id", verifyToken, messages.getUserMessages);

export default router;
