// import { Request, Response } from "express";
// const passport = require("passport");
// const FacebookStrategy = require("passport-facebook").Strategy;
// import User from "./user.model";
// require("dotenv").config();

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_SECRET_KEY,
//       callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//     },
//     async function (
//       accessToken: any,
//       refreshToken: any,
//       profile: any,
//       cb: any
//     ) {
//       const user = await User.findOne({
//         accountId: profile.id,
//         provider: "facebook",
//       });
//       if (!user) {
//         console.log("Adding new facebook user to DB..");
//         const user = new User({
//           accountId: profile.id,
//           firstname: profile.displayName,
//           provider: profile.provider,
//         });
//         await user.save();
//         return cb(null, profile);
//       } else {
//         console.log("Facebook User already exist in DB..");
//         return cb(null, profile);
//       }
//     }
//   )
// );

// class FacebookController {
//   async authenticate(req: Request, res: Response) {
//     passport.authenticate("facebook", { scope: "email" });
//     // Successful authentication, redirect to success screen.
//     res.status(200).json({
//       message: "success",
//     });
//   }

//   async callback(req: Request, res: Response) {
//     passport.authenticate("facebook", {
//       failureRedirect: "/auth/facebook/error",
//     });
//     // Successful authentication, redirect to success screen.
//     res.status(200).json({
//       message: "success",
//     });
//   }

//   async logout(req: any, res: Response) {
//     try {
//       req.session.destroy((err: any) => {
//         console.log("session destroyed.");
//       });
//       res.render("auth");
//     } catch (err) {
//       res.status(400).send({ message: "Failed to sign out fb user" });
//     }
//   }
// }

// export default FacebookController;
