
import express, { Router } from "express";
import ExpertCtl from "./expert.controller";
// import { upload } from "../../middleware/s3/s3";

const router: Router = express.Router();
const user = new ExpertCtl();

router.post("/register", user.register);
router.post("/login", user.login);
router.post("/forgot-password", user.forgotPassword);

router.get("/verification/:token", user.verifyEmail);
router.get("/expert/:id", user.user);
router.get("/experts", user.users);

// router.put(
//   "/upload-profile-image/:id",
//   upload.single("profileImage"),
//   user.uploadProfileImage
// );
router.put("/update-exxpert/:id", user.update);
router.put("/update-password/:id", user.updatePassword);
router.put("/new-password/:id", user.newPassword);

export default router;
