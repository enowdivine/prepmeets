import { Request, Response } from "express";
import Expert, { ExpertMap } from "./expert.model";
import sequelizeDB from "../../config/db";
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
  verificationCode,
  verificationCodeTitle,
} from "./templates/verificationCode/verificationCode";

class ExpertController {
  async register(req: Request, res: Response) {
    try {
      ExpertMap(sequelizeDB);
      const user = await Expert.findOne({ where: { email: req.body.email } });
      if (user) {
        return res.status(409).json({
          message: "email already exist",
        });
      }
      const hash = await bcrypt.hash(req.body.password, 10);
      const userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        focusarea: req.body.focusarea,
        havecertifications: req.body.havecertifications,
        password: hash,
      };
      await Expert.create(userData)
        .then((newuser) => {
          const token: string = jwt.sign(
            {
              id: newuser.id,
              email: newuser.email,
              phone: newuser.phone,
            },
            process.env.JWT_SECRET as string
          );
          sendEmail({
            to: newuser.email as string,
            subject: verifyEmailTitle(req.body.firstname),
            message: verifyEmail(),
          });
          res.status(201).json({
            message: "success",
            token,
          });
        })
        .catch((err) => {
          res.status(400).json({
            message: "an error occured",
            err,
          });
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
      ExpertMap(sequelizeDB);
      const user = await Expert.findOne({ where: { id: decodedToken.id } });
      if (user) {
        user.set({ emailConfirmed: true });
        await user
          .save()
          .then(() => {
            // sendEmail({
            //   to: decodedToken.email as string,
            //   subject: "Deonicode: Welcome",
            //   message: welcomeEmail(decodedToken.username as string),
            // });
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
      ExpertMap(sequelizeDB);
      const user = await Expert.findOne({ where: { email: req.body.email } });
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
      ExpertMap(sequelizeDB);
      const user = await Expert.findOne({ where: { id: req.params.id } });
      if (user) {
        user.set({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          phone: req.body.phone,
          email: req.body.email,
          bio: req.body.bio,
          education: req.body.education,
          experience: req.body.experience,
          certificates: req.body.certificates,
          gender: req.body.gender,
          dateOfBirth: req.body.dateOfBirth,
          location: req.body.location,
          focusarea: req.body.focusarea,
          havecertifications: req.body.havecertifications,
          timeNotice: req.body.timeNotice,
          timezone: req.body.timezone,
          calenderSlots: req.body.calenderSlots,
          pricing: {
            starterPrice: req.body.starterPrice,
            recommendedPrice: req.body.recommendedPrice,
            bestPrice: req.body.bestPrice,
          },
          trialSessions: req.body.trialSessions,
          visibilityLevel: req.body.visibilityLevel,
          payments: {
            fullname: req.body.fullname,
            paymentStream: req.body.paymentStream,
            IBAN: req.body.IBAN,
            SWIFTBIC: req.body.SWIFTBIC,
          },
        });
        await user
          .save()
          .then((resUser) => {
            const token: string = jwt.sign(
              {
                id: resUser?.id,
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
          "uploads/expert/profileImages",
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
      ExpertMap(sequelizeDB);
      const user = await Expert.findOne({ where: { id: req.params.id } });
      if (user) {
        if (user?.avatar !== null) {
          const filePathToDelete = path.join(
            __dirname,
            "uploads/expert/profileImages",
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
        res.status(404).json({
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
      ExpertMap(sequelizeDB);
      let user = await Expert.findOne({ where: { id: req.params.id } });
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
      ExpertMap(sequelizeDB);
      const user = await Expert.findOne({ where: { id: req.params.id } });
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
      ExpertMap(sequelizeDB);
      const users = await Expert.findAll();
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
        error,
      });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      ExpertMap(sequelizeDB);
      const user = await Expert.findOne({ where: { email: req.body.email } });
      if (user) {
        const resetToken: string = jwt.sign(
          {
            id: user.id,
            email: user.email,
            phone: user.phone,
          },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "1h",
          }
        );
        const url = `${process.env.FRONTEND_URL}/new-password/${resetToken}`;
        sendEmail({
          to: user.email as string,
          subject: verificationCodeTitle(),
          message: verificationCode(),
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
      ExpertMap(sequelizeDB);
      let user = await Expert.findOne({ where: { id: req.params.id } });
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
                    id: result._id,
                    phone: result.phone,
                    email: result.email,
                  },
                  process.env.JWT_SECRET as string
                );
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
}

export default ExpertController;
