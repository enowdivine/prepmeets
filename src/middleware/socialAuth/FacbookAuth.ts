// import { Response, Request, NextFunction } from "express";
// const passport = require("passport");
// const FacebookStrategy = require("passport-facebook").Strategy;
// import User from "../../routes/users/user.model";

// export default (req: Request, res: Response, next: NextFunction) => {
//   passport.use(
//     new FacebookStrategy(
//       {
//         clientID: process.env.FACEBOOK_CLIENT_ID,
//         clientSecret: process.env.FACEBOOK_SECRET_KEY,
//         callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//       },
//       async function (
//         accessToken: any,
//         refreshToken: any,
//         profile: any,
//         cb: any
//       ) {
//         const user = await User.findOne({
//           accountId: profile.id,
//           provider: "facebook",
//         });
//         if (!user) {
//           console.log("Adding new facebook user to DB..");
//           const user = new User({
//             accountId: profile.id,
//             name: profile.displayName,
//             provider: profile.provider,
//           });
//           await user.save();
//           return cb(null, profile);
//         } else {
//           console.log("Facebook User already exist in DB..");
//           return cb(null, profile);
//         }
//       }
//     )
//   );
// };
