import express, { Router } from "express";
import UserCtl from "./user.controller"; // user controller
// import FacebookController from "./facebook.auth"; // facebook auth controller
import fileUpload from "express-fileupload";
import fileExtLimiter from "../../middleware/fileUpload/fileExtLimiter";
import fileSizeLimiter from "../../middleware/fileUpload/fileSizeLimiter";
import filesPayloadExists from "../../middleware/fileUpload/filePayloadExists";
import UserAuthMiddleware from "../../middleware/auth/verifyUser"; // user auth middleware

const router: Router = express.Router();
const user = new UserCtl();
// const facebook = new FacebookController();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - firstname
 *              - lastname
 *              - email
 *              - password
 *          properties:
 *              role:
 *                  type: string
 *                  description: uniquely identifies the type of current active user
 *              avatar:
 *                  type: object
 *                  description: profile image of user
 *              firstname:
 *                  type: string
 *                  description: first name
 *              lastname:
 *                  type: string
 *                  description: last name
 *              email:
 *                  type: string
 *                  description: email
 *              phone:
 *                  type: number
 *                  description: phone number
 *              whatINeed:
 *                  type: string
 *                  description: what the user is expecting from prepmeets
 *              location:
 *                  type: string
 *                  description: user location
 *              password:
 *                  type: string
 *                  description: user password
 *              emailConfirmed:
 *                  type: boolean
 *                  description: use to determine user email is confirmed or not
 *          example:
 *              role: client
 *              firstname: Enow
 *              lastname: Divine
 *              email: test@gmail.com
 *              phone: 672491296
 *              whatINeed: To be a pro in devops
 *              location: Cameroon
 *              password: 12345678
 *              emailConfirmed: false
 */

/**
 * @swagger
 * tags:
 *  name: User
 *  description: The Client managing API
 */

/**
 * @swagger
 * /api/v1/clients/register:
 *   post:
 *      summary: create a new user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: user created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: an error occured
 */
router.post("/register", user.register);

/**
 * @swagger
 * /api/v1/clients/login:
 *   post:
 *      summary: user login
 *      tags: [User]
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
 * /api/v1/clients/forgot-password:
 *   post:
 *      summary: forgot password
 *      tags: [User]
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
 * /api/v1/clients/verification/{token}:
 *   get:
 *      summary: email verification
 *      tags: [User]
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
router.get("/verification/:token", user.verifyEmail);

/**
 * @swagger
 * /api/v1/clients/{id}:
 *   get:
 *      summary: get user by id
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: user id
 *      responses:
 *          200:
 *              description: returns a single user
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          404:
 *              description: user was not found
 */
router.get("/:id", UserAuthMiddleware, user.user);

/**
 * @swagger
 * /api/v1/clients/:
 *   get:
 *      summary: get all users
 *      tags: [User]
 *      responses:
 *          200:
 *              description: The list of all users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 */
router.get("/", user.users);

/**
 * @swagger
 * /api/v1/clients/update-profile-image/{id}:
 *   put:
 *      summary: update profile image
 *      tags: [User]
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
  "/upload-profile-image/:id",
  UserAuthMiddleware,
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  user.uploadProfileImage
);

/**
 * @swagger
 * /api/v1/clients/update-user/{id}:
 *   put:
 *      summary: update user details
 *      tags: [User]
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
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: user updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          404:
 *              description: user not found
 *          500:
 *              description: an error occured
 */
router.put("/update-user/:id", UserAuthMiddleware, user.update);

/**
 * @swagger
 * /api/v1/clients/update-password/{id}:
 *   put:
 *      summary: update user password
 *      tags: [User]
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
 *              description: user not found
 *          500:
 *              description: an error occured
 */
router.put("/update-password/:id", UserAuthMiddleware, user.updatePassword);

/**
 * @swagger
 * /api/v1/clients/new-password/{id}:
 *   put:
 *      summary: create new user password
 *      tags: [User]
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
 *                              description: new user password
 *      responses:
 *          200:
 *              description: password updated successfully
 *          404:
 *              description: user not found
 *          500:
 *              description: an error occured
 */
router.put("/new-password/:id", UserAuthMiddleware, user.newPassword);

// FACEBOOK AUTHENTICATION ROUTES
// router.get("/facebook-login", facebook.authenticate);

// router.get("/callback", facebook.callback);

// router.get("/signout", facebook.logout);

export default router;
