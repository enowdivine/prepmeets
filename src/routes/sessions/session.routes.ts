import express, { Router } from "express";
import SessionCtl from "./session.controller";
import userAuthMiddleware from "../../middleware/auth/verifyUser";
import verifyToken from "../../middleware/auth/verifyToken";

const router: Router = express.Router();
const session = new SessionCtl();

/**
 * @swagger
 * components:
 *  schemas:
 *      Session:
 *         type: object
 *         required:
 *              - experId
 *              - clientId
 *              - sessionType
 *              - paymentType
 *              - sessionDate
 *         properties:
 *              expertId:
 *                 type: string
 *                 description: expert ID
 *              clientId:
 *                 type: string
 *                 description: client ID
 *              sessionType:
 *                 type: string
 *                 description: session type
 *              sessionDate:
 *                 type: date
 *                 description: session date
 *              paymentType:
 *                 type: string
 *                 description: starter, recommended, or best deal
 *              paymentAmount:
 *                 type: number
 *                 description: payment amount
 *              duration:
 *                  type: string
 *                  description: duration
 *              sessionStatus:
 *                 type: string
 *                 description: session status (pe)
 *              paymentStatus:
 *                 type: string
 *                 description: user email
 *              prepmeetCommission:
 *                 type: number
 *                 description: prepmeet commission
 */

/**
 * @swagger
 * tags:
 *  name: Session
 *  description: The Session managing API
 */

/**
 * @swagger
 * /api/v1/sessions/create-checkout-session:
 *   post:
 *      summary: create a new session
 *      tags: [Session]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Session'
 *      responses:
 *          200:
 *              description: session created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Session'
 *          500:
 *              description: an error occured
 */
router.post("/create-checkout-session", userAuthMiddleware, session.create);

/**
 * @swagger
 * /api/v1/sessions/{id}:
 *   get:
 *      summary: get session by id
 *      tags: [Session]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: session id
 *      responses:
 *          200:
 *              description: returns a single session object
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Session'
 *          404:
 *              description: session was not found
 */
router.get("/:id", verifyToken, session.session);

/**
 * @swagger
 * /api/v1/sessions/client/{id}?page=1&limit=10:
 *   get:
 *      summary: get client sessions by id
 *      tags: [Session]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: client id
 *      responses:
 *          200:
 *              description: returns a single session object
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Session'
 *          404:
 *              description: session was not found
 */
router.get("/client/:id", verifyToken, session.clientSessions);

/**
 * @swagger
 * /api/v1/sessions/expert/{id}?page=1&limit=10:
 *   get:
 *      summary: get expert sessions by id
 *      tags: [Session]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: expert id
 *      responses:
 *          200:
 *              description: returns a single session object
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Session'
 *          404:
 *              description: session was not found
 */
router.get("/expert/:id", verifyToken, session.expertSessions);

/**
 * @swagger
 * /api/v1/sessions?page=1&limit=10:
 *   get:
 *      summary: get all sessions
 *      tags: [Session]
 *      responses:
 *          200:
 *              description: The list of all sessions
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Session'
 */
router.get("/", verifyToken, session.sessions);

/**
 * @swagger
 * /api/v1/sessions/update-status/{id}:
 *   put:
 *      summary: update session details
 *      tags: [Session]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: session id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          sessionStatus:
 *                              type: string
 *                              description: session status
 *      responses:
 *          200:
 *              description: session updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Session'
 *          404:
 *              description: session not found
 *          500:
 *              description: an error occured
 */
router.put("/update-status/:id", verifyToken, session.updateStatus);

router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  session.webhook
);

export default router;
