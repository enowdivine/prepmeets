import express, { Router } from "express";
import ExpertCtl from "./expert.controller";
import fileUpload from "express-fileupload";
import fileExtLimiter from "../../middleware/fileUpload/fileExtLimiter";
import fileSizeLimiter from "../../middleware/fileUpload/fileSizeLimiter";
import filesPayloadExists from "../../middleware/fileUpload/filePayloadExists";
import ExpertAuthMiddleware from "../../middleware/auth/verifyExpert";
import verifyToken from "../../middleware/auth/verifyToken";

const router: Router = express.Router();
const user = new ExpertCtl();

/**
 * @swagger
 * components:
 *  schemas:
 *      Expert:
 *         type: object
 *         required:
 *              - firstname
 *              - lastname
 *              - email
 *              - phone
 *              - password
 *         properties:
 *              role:
 *                 type: string
 *                 description: user role
 *              avatar:
 *                 type: object
 *                 description: user avatar
 *              introvideo:
 *                 type: object
 *                 description: user intro video
 *              firstname:
 *                 type: string
 *                 description: user first name
 *              lastname:
 *                 type: string
 *                 description: user last name
 *              email:
 *                 type: string
 *                 description: user email
 *              phone:
 *                  type: string
 *                  description: user phone
 *              password:
 *                  type: string
 *                  description: user password
 *              emailConfirmed:
 *                  type: boolean
 *                  description: user confirmed
 *              bio:
 *                  type: string
 *                  description: user bio
 *              education:
 *                  type: string
 *                  description: lits of past or present education
 *              experience:
 *                  type: string
 *              certificates:
 *                  type: string
 *              gender:
 *                  type: string
 *                  description: gender
 *              dateOfBirth:
 *                  type: date
 *                  description: date of birth
 *              location:
 *                  type: string
 *                  description: location
 *              focusarea:
 *                  type: string
 *                  description: forcusarea
 *              havecertifications:
 *                  type: boolean
 *              timeNotice:
 *                  type: string
 *                  description: time notice
 *              timeZone:
 *                  type: date
 *                  description: time zone
 *              calenderSlots:
 *                  type: string
 *              pricing:
 *                  type: object
 *                  properties:
 *                      starterPrice:
 *                          type: number
 *                          description: starter price
 *                      recommendedPrice:
 *                          type: number
 *                          description: recommended price
 *                      bestPrice:
 *                          type: number
 *                          description: best price
 *              trialSessions:
 *                  type: boolean
 *                  description: trial sessions
 *              visibilityLevel:
 *                  type: string
 *                  description: visibility level
 *              payments:
 *                  type: object
 *                  properties:
 *                      fullname:
 *                          type: string
 *                          description: full name
 *                      paymentStream:
 *                          type: string
 *                          description: payment stream
 *                      IBAN:
 *                          type: string
 *                          description: IBAN
 *
 *                      SWIFTBIC:
 *                          type: string
 *                          description: SWIFTBIC
 */

/**
 * @swagger
 * tags:
 *  name: Expert
 *  description: The Expert managing API
 */

/**
 * @swagger
 * /api/v1/experts/register:
 *   post:
 *      summary: create a new expert
 *      tags: [Expert]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Expert'
 *      responses:
 *          200:
 *              description: expert created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Expert'
 *          500:
 *              description: an error occured
 */
router.post("/register", user.register);

/**
 * @swagger
 * /api/v1/experts/login:
 *   post:
 *      summary: expert login
 *      tags: [Expert]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: user email
 *                          password:
 *                              type: string
 *                              description: user password
 *                      example:
 *                          email: test@gmail.com
 *                          password: 1234
 *      responses:
 *          200:
 *              description: success
 *          500:
 *              description: authentication failed
 */
router.post("/login", user.login);

/**
 * @swagger
 * /api/v1/experts/forgot-password:
 *   post:
 *      summary: forgot password
 *      tags: [Expert]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: user email
 *                      example:
 *                          email: test@gmail.com
 *      responses:
 *          200:
 *              description: success
 *          500:
 *              description: an error occured
 */
router.post("/forgot-password", user.forgotPassword);

/**
 * @swagger
 * /api/v1/experts/verification/{token}:
 *   post:
 *      summary: email verification
 *      tags: [Expert]
 *      parameters:
 *          - in: path
 *            name: token
 *            schema:
 *              type: string
 *            required: true
 *            description: token
 *      responses:
 *          200:
 *              description: success
 *          500:
 *              description: email verification failed
 */
router.post("/verification/:token", user.verifyEmail);

/**
 * @swagger
 * /api/v1/experts/verifyotp/{token}:
 *   post:
 *      summary: forgot password verification
 *      tags: [Expert]
 *      parameters:
 *          - in: path
 *            name: token
 *            schema:
 *              type: string
 *            required: true
 *            description: token
 *      responses:
 *          200:
 *              description: success
 *          500:
 *              description: email verification failed
 */
router.post("/verifyotp/:token", user.verifyOTP);

/**
 * @swagger
 * /api/v1/experts/details:
 *   get:
 *      summary: get expert by id
 *      tags: [Expert]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: user id
 *      responses:
 *          200:
 *              description: returns a single expert
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Expert'
 *          404:
 *              description: expert was not found
 */
router.get("/details", verifyToken, user.user);

/**
 * @swagger
 * /api/v1/experts/{id}:
 *   get:
 *      summary: get expert by id
 *      tags: [Expert]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: user id
 *      responses:
 *          200:
 *              description: returns a single expert
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Expert'
 *          404:
 *              description: expert was not found
 */
router.get("/:id", verifyToken, user.userById);

/**
 * @swagger
 * /api/v1/experts?page=1&limit=10:
 *   get:
 *      summary: get all experts
 *      tags: [Expert]
 *      responses:
 *          200:
 *              description: The list of all experts
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Expert'
 */
router.get("/", user.users);

/**
 * @swagger
 * /api/v1/experts/update-profile-image:
 *   put:
 *      summary: update profile image
 *      tags: [Expert]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: user id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      required:
 *                          - files
 *                      items:
 *                          files:
 *                              type: array
 *                              description: images files
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: user not found
 *          500:
 *              description: an error occured
 */
router.put(
  "/upload-profile-image",
  ExpertAuthMiddleware,
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter(["image/jpeg", "image/png", "image/jpg"]),
  fileSizeLimiter,
  user.uploadProfileImage
);

/**
 * @swagger
 * /api/v1/experts/update-expert:
 *   put:
 *      summary: update expert details
 *      tags: [Expert]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: user id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Expert'
 *      responses:
 *          200:
 *              description: expert updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Expert'
 *          404:
 *              description: user not found
 *          500:
 *              description: an error occured
 */
router.put(
  "/update-expert",
  ExpertAuthMiddleware,
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileSizeLimiter,
  fileExtLimiter(["application/pdf"]),
  user.update
);

/**
 * @swagger
 * /api/v1/experts/update-password:
 *   put:
 *      summary: update expert password
 *      tags: [Expert]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: user id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - currentPassword
 *                          - newPassword
 *                      properties:
 *                          currentPassword:
 *                              type: string
 *                              description: current password
 *                          newPassword:
 *                              type: string
 *                              description: new password
 *                      example:
 *                          currentPassword: 1234
 *                          newPassword: 1234
 *      responses:
 *          200:
 *              description: password updated successfully
 *          404:
 *              description: expert not found
 *          500:
 *              description: an error occured
 */
router.put("/update-password", ExpertAuthMiddleware, user.updatePassword);

/**
 * @swagger
 * /api/v1/experts/new-password:
 *   put:
 *      summary: create new expert password
 *      tags: [Expert]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: user id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - newPassword
 *                      properties:
 *                          newPassword:
 *                              type: string
 *                              description: new expert password
 *      responses:
 *          200:
 *              description: password updated successfully
 *          404:
 *              description: expert not found
 *          500:
 *              description: an error occured
 */
router.put("/new-password", user.newPassword);

// SOCIAL AUTHENTICATION ROUTES

/**
 * @swagger
 * /api/v1/experts/social-auth:
 *   post:
 *      summary: Expert login and sign up route
 *      tags: [Expert]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Expert'
 *      responses:
 *          200:
 *              description: expert created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Expert'
 *          500:
 *              description: an error occured
 */
router.post("/social-auth", user.socialLogin);

export default router;

// {
//   "firstname": "Enow",
//   "lastname": "Divine",
//   "email": "sirdivine16@gmail.com",
//   "phone": "672491296",
//   "password": "tester",
//   "focusarea": ["devops", "blockchain"],
//   "havecertifications": true
// }
