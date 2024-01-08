import express, { Router } from "express";
import StripeController from "./stripe.controller";

const router: Router = express.Router();
const stripe = new StripeController();

/**
 * @swagger
 * components:
 *  schemas:
 *      Stripe:
 *         type: object
 *         required:
 *              - amount
 *         properties:
 *              amount:
 *                 type: number
 *                 description: payment amount
 */

/**
 * @swagger
 * tags:
 *  name: Stripe
 *  description: The Stripe managing API
 */

/**
 * @swagger
 * /api/v1/payments/publishable-key:
 *   get:
 *      summary: get publishable key
 *      tags: [Stripe]
 *      responses:
 *          200:
 *              description: publishable key for stripe checkout form
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Stripe'
 */
router.get("/publishable-key", stripe.getPublishableKey);

/**
 * @swagger
 * /api/v1/payments/initiate-payment:
 *   post:
 *      summary: initiate stripe payment
 *      tags: [Stripe]
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Stripe'
 *          500:
 *              description: an error occured
 */
router.post("/initiate-payment", stripe.initiatePayment);

export default router;
