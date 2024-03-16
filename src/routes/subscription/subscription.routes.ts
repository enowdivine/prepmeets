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
 * /api/v1/subscriptions/subscribe:
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
 * /api/v1/subscriptions?page=1&limit=10:
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
router.get("/", mail.subsribers);

/**
 * @swagger
 * /api/v1/subscriptions/unsubscribe:
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
