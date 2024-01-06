import express, { Router } from "express";
import SubscriptionController from "./subscription.controller";

const router: Router = express.Router();
const mail = new SubscriptionController();

/**
 * @swagger
 * components:
 *  schemas:
 *      Subscription:
 *         type: object
 *         required:
 *              - email
 *         properties:
 *              email:
 *                 type: string
 *                 description: user email
 */

/**
 * @swagger
 * tags:
 *  name: Subscription
 *  description: The Subscription managing API
 */

/**
 * @swagger
 * /api/v1/subscription/subscribe:
 *   post:
 *      summary: new subscription
 *      tags: [Subscription]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Subscription'
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Subscription'
 *          500:
 *              description: an error occured
 */
router.post("/subscribe", mail.subscribe);

/**
 * @swagger
 * /api/v1/subscription/Subscription:
 *   get:
 *      summary: get all emails
 *      tags: [Subscription]
 *      responses:
 *          200:
 *              description: The list of all emails
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Subscription'
 */
router.get("/subscribers", mail.subsribers);

/**
 * @swagger
 * /api/v1/subscription/unsubscribe:
 *   delete:
 *      summary: unsubscribe
 *      tags: [Subscription]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Subscription'
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Subscription'
 *          500:
 *              description: an error occured
 */
router.delete("/unsubscribe", mail.unsubscribe);

export default router;
