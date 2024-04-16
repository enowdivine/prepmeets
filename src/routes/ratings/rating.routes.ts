import express, { Router } from "express";
import Ratings from "./rating.controller";
import verifyToken from "../../middleware/auth/verifyToken";

const router: Router = express.Router();
const rating = new Ratings();

/**
 * @swagger
 * components:
 *  schemas:
 *      Rating:
 *         type: object
 *         required:
 *              - expertId
 *              - userId
 *              - rating
 *              - comment
 *         properties:
 *              expertId:
 *                 type: string
 *                 description: expert ID
 *              userId:
 *                 type: string
 *                 description: user ID
 *              rating:
 *                 type: number
 *                 description: rating
 *              comment:
 *                 type: string
 *                 description: comment
 */

/**
 * @swagger
 * tags:
 *  name: Rating
 *  description: The Rating managing API
 */

/**
 * @swagger
 * /api/v1/ratings/create:
 *   post:
 *      summary: create a new rating
 *      tags: [Rating]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Rating'
 *      responses:
 *          200:
 *              description: rating created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Rating'
 *          500:
 *              description: an error occured
 */
router.post("/create", rating.create);

/**
 * @swagger
 * /api/v1/ratings/expert/{id}?page=1&limit=10:
 *   get:
 *      summary: get expert reviews
 *      tags: [Rating]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: expert id
 *      responses:
 *          200:
 *              description: returns array of expert reviews
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          $ref: '#/components/schemas/Rating'
 *          404:
 *              description: rating not found
 */
router.get("/expert/:id", rating.ratings);

export default router;
