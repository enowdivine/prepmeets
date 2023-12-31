import express, { Router } from "express";
import UserCtl from "./user.controller";
// import { upload } from "../../middleware/s3/s3";

const router: Router = express.Router();
const user = new UserCtl();

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
 * /api/v1/client/register:
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
 * /api/v1/client/login:
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
 * /api/v1/client/forgot-password:
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
 * /api/v1/client/verification/{token}:
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
 * /api/v1/client/user/{id}:
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
router.get("/user/:id", user.user);

/**
 * @swagger
 * /api/v1/client/users:
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
router.get("/users", user.users);

// router.put(
//   "/upload-profile-image/:id",
//   upload.single("profileImage"),
//   user.uploadProfileImage
// );

/**
 * @swagger
 * /api/v1/client/update-user/{id}:
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
router.put("/update-user/:id", user.update);

/**
 * @swagger
 * /api/v1/client/update-password/{id}:
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
router.put("/update-password/:id", user.updatePassword);

/**
 * @swagger
 * /api/v1/client/new-password/{id}:
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
router.put("/new-password/:id", user.newPassword);

export default router;
