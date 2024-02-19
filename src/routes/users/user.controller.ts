import { Request, Response } from "express";
import User from "./user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import _ from "lodash";
const fs = require("fs");
const path = require("path");
import { appRoot } from "../..";
import sendEmail from "../../services/email/sendEmail";
import {
  verifyEmail,
  verifyEmailTitle,
} from "./templates/verifyEmail/verifyEmail";
import {
  accountApproved,
  accountApprovedTitle,
} from "./templates/accountApproved/accountApproved";
import {
  resetPassword,
  resetPasswordTitle,
} from "./templates/resetPassword/resetPassword";
import {
  welcomeBack,
  welcomeBackTitle,
} from "./templates/welcomeBack/welcomeBack";

class UserController {
  async register(req: Request, res: Response) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (user) {
        return res.status(409).json({
          message: "email already exist",
        });
      }
      const hash = await bcrypt.hash(req.body.password, 10);
      const userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        whatINeed: req.body.whatINeed,
        location: req.body.location,
        password: hash,
      };
      const newuser = await User.create(userData);
      const token: string = jwt.sign(
        {
          id: newuser.id,
          role: newuser.role,
          email: newuser.email,
          phone: newuser.phone,
        },
        process.env.JWT_SECRET as string
      );
      const url = `${process.env.SERVER_URL}/api/${process.env.API_VERSION}/clients/verification/${token}`;
      sendEmail({
        to: newuser.email as string,
        subject: "Prepmeet Email Verification",
        title: verifyEmailTitle(req.body.firstname),
        message: verifyEmail(req.body.firstname, url),
      });
      res.status(201).json({
        message: "success",
        token,
      });
    } catch (error) {
      console.error("user registration error", error);
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const decodedToken: any = jwt.verify(
        req.params.token,
        process.env.JWT_SECRET as string
      );
      const user = await User.findOne({ where: { id: decodedToken.id } });
      if (user) {
        user.set({ emailConfirmed: true });
        await user
          .save()
          .then(() => {
            sendEmail({
              to: decodedToken.email as string,
              subject: `Welcome ${user.firstname}`,
              title: accountApprovedTitle(user.firstname as string),
              message: accountApproved(),
            });
            return res.status(200).json({
              message: "success",
            });
          })
          .catch((err: any) => {
            return res.status(500).json({
              message: "email verification failed",
              error: err,
            });
          });
      } else {
        return res.status(404).json({
          message: "user not found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (user) {
        if (user.emailConfirmed === false) {
          return res.status(401).json({
            message: "verify email to login",
          });
        }
        bcrypt.compare(
          req.body.password,
          user.password!,
          (err: any, result: any) => {
            if (err) {
              return res.status(401).json({
                message: "authentication failed",
              });
            }
            if (result) {
              const token: string = jwt.sign(
                {
                  id: user.id,
                  role: user.role,
                  phone: user.phone,
                  email: user.email,
                },
                process.env.JWT_SECRET as string
              );
              return res.status(200).json({
                message: "success",
                token: token,
              });
            }
            res.status(401).json({
              message: "authentication failed",
            });
          }
        );
      } else {
        return res.status(401).json({
          message: "authentication failed",
        });
      }
    } catch (error) {
      console.error("user login error", error);
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (user) {
        user.set({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          phone: req.body.phone,
          whatINeed: req.body.whatINeed,
          location: req.body.location,
        });
        await user
          .save()
          .then((resUser) => {
            console.log(resUser);
            const token: string = jwt.sign(
              {
                id: resUser?.id,
                role: resUser?.role,
                phone: resUser?.phone,
                email: resUser?.email,
              },
              process.env.JWT_SECRET as string
            );
            return res.status(200).json({
              message: "success",
              token,
            });
          })
          .catch((err: any) => {
            return res.status(500).json({
              message: "email verification failed",
              error: err,
            });
          });
      } else {
        return res.status(404).json({
          message: "user not found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async uploadProfileImage(req: Request, res: Response) {
    try {
      const files: any = req.files;

      Object.keys(files).forEach((key) => {
        const filepath = path.join(
          appRoot,
          "uploads/client/profileImages",
          files[key].name
        );
        files[key].mv(filepath, (err: any) => {
          if (err)
            return res
              .status(500)
              .json({ message: "error uploading profile imag", error: err });
        });
      });

      // Find and delete current image if it exist
      const user = await User.findOne({ where: { id: req.params.id } });
      if (user) {
        if (user.avatar !== null) {
          const filePathToDelete = path.join(
            __dirname,
            "uploads/client/profileImages",
            user.avatar
          );
          // Use fs.unlink to delete the file
          fs.unlink(appRoot, (err: any) => {
            if (err) {
              console.error(`Error deleting file: ${err.message}`);
            } else {
              console.log(`File ${filePathToDelete} deleted successfully.`);
            }
          });
        }

        // upload new image to database
        const profileImage: any[] = Object.entries(files)[0];
        // const image = {
        //   doc: profileImage[1].name,
        //   key: profileImage[0],
        // };

        user.set({
          avatar: profileImage[1].name,
        });
        await user.save().then(() => {
          return res.status(200).json({
            message: "success",
          });
        });
      } else {
        return res.status(404).json({
          message: "user not found",
        });
      }
    } catch (error) {
      console.error("error uploading profile image", error);
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async updatePassword(req: Request, res: Response) {
    try {
      let user = await User.findOne({ where: { id: req.params.id } });
      if (user) {
        const { currentPassword, newPassword } = req.body;
        bcrypt
          .compare(currentPassword, user.password!)
          .then((match: any) => {
            if (match) {
              bcrypt.hash(newPassword, 10, (error: any, hash: any) => {
                if (error) {
                  return res.status(500).json({
                    error: error,
                  });
                }
                const passwordUpdate = {
                  password: hash,
                };
                user = _.extend(user, passwordUpdate);
                if (user) {
                  user
                    .save()
                    .then((result: any) => {
                      res.status(200).json({
                        message: "success",
                      });
                    })
                    .catch((error: any) => {
                      res.status(500).json({
                        error: error,
                      });
                    });
                }
              });
            } else {
              return res.status(500).json({
                message: "passwords do not match",
              });
            }
          })
          .catch((err: any) => {
            return res.status(401).json({
              error: err,
            });
          });
      }
    } catch (error) {
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async user(req: Request, res: Response) {
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({
          message: "user not found",
        });
      }
    } catch (error) {
      console.error("error fetching user", error);
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async users(req: Request, res: Response) {
    try {
      const users = await User.findAll();
      if (users) {
        return res.status(200).json(users);
      } else {
        return res.status(404).json({
          message: "no user found",
        });
      }
    } catch (error) {
      console.error("error fetching users", error);
      return res.status(500).json({
        message: "error fetching users",
      });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (user) {
        const resetToken: string = jwt.sign(
          {
            id: user.id,
            role: user.role,
            email: user.email,
            phone: user.phone,
          },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "1h",
          }
        );
        const url = `${process.env.FRONTEND_URL}/api/${process.env.API_VERSION}/clients/new-password/${resetToken}`;
        sendEmail({
          to: user.email as string,
          subject: "Forgot password - Prepmeet",
          title: resetPasswordTitle(),
          message: resetPassword(url),
        });
        return res.status(200).json({
          message: "success, check your inbox",
        });
      } else {
        return res.status(500).json({
          message: "email does not exist",
        });
      }
    } catch (error) {
      console.error("error in forgot password", error);
      return res.status(500).json({
        message: "an error occured",
      });
    }
  }

  async newPassword(req: Request, res: Response) {
    try {
      let user = await User.findOne({ where: { id: req.params.id } });
      if (user) {
        const { newPassword } = req.body;
        bcrypt.hash(newPassword, 10, async (error: any, hash: any) => {
          if (error) {
            return res.status(500).json({
              error: error,
            });
          }
          const passwordUpdate = {
            password: hash,
          };
          user = _.extend(user, passwordUpdate);
          if (user) {
            user
              .save()
              .then((result: any) => {
                const token: string = jwt.sign(
                  {
                    id: result.id,
                    phone: result.phone,
                    email: result.email,
                  },
                  process.env.JWT_SECRET as string
                );
                sendEmail({
                  to: result.email as string,
                  subject: `Welcome back ${result.firstname}`,
                  title: welcomeBackTitle(result.firstname),
                  message: welcomeBack(),
                });
                res.status(200).json({
                  message: "success",
                  token: token,
                });
              })
              .catch((error: any) => {
                res.status(500).json({
                  error: error,
                });
              });
          }
        });
      } else {
        return res.status(500).json({
          message: "email does not exist",
        });
      }
    } catch (error) {
      console.error("error in new password", error);
      return res.status(500).json({
        message: "an error occured",
      });
    }
  }

  // SOCIAL AUTHENTICATION HANDLERS

  async socialLogin(req: Request, res: Response) {
    try {
      const user = await User.findOne({
        where: { accountId: req.body.accountId },
      });
      if (user) {
        const token: string = jwt.sign(
          {
            id: user.id,
            role: user.role,
            email: user.email,
            accountId: user.accountId,
          },
          process.env.JWT_SECRET as string
        );
        res.status(201).json({
          message: "success",
          token,
        });
      }
      const userData = {
        accountId: req.body.accountId,
        provider: req.body.provider,
        email: req.body.email,
        emailConfirmed: true,
      };
      const newuser = await User.create(userData);
      const token: string = jwt.sign(
        {
          id: newuser.id,
          role: newuser.role,
          email: newuser.email,
          accountId: newuser.accountId,
        },
        process.env.JWT_SECRET as string
      );
      sendEmail({
        to: newuser.email as string,
        subject: `Welcome To Prepmeets`,
        title: accountApprovedTitle(newuser?.firstname as string),
        message: accountApproved(),
      });
      res.status(201).json({
        message: "success",
        token,
      });
    } catch (error) {
      console.error("user registration error", error);
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }
}

export default UserController;
