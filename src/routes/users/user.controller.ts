import { Request, Response } from "express";
import User from "./user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import _ from "lodash";
const fs = require("fs");
const path = require("path");
import { appRoot } from "../..";

class UserController {
  async register(req: Request, res: Response) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(409).json({
          message: "email already exist",
        });
      }
      const hash = await bcrypt.hash(req.body.password, 10);
      const newuser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
      });
      newuser
        .save()
        .then((response) => {
          const token = {
            id: response._id,
            email: response.email,
            phone: response.phone,
          };
          res.status(201).json({
            message: "success",
            token,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "an error occured",
            error: err,
          });
        });
    } catch (error) {
      console.error("user registration error", error);
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const decodedToken: any = jwt.verify(
        req.params.token,
        process.env.JWT_SECRET as string
      );
      const response = await User.updateOne(
        { _id: decodedToken.id },
        {
          $set: {
            emailConfirmed: true,
          },
        }
      );
      if (response.acknowledged) {
        // write send mail function here
        // sendEmail({
        //   to: decodedToken.email as string,
        //   subject: "Deonicode: Welcome",
        //   message: welcomeEmail(decodedToken.username as string),
        // });
        res.redirect(301, `${process.env.FRONTEND_URL}`);
      } else {
        res.status(500).json({
          message: "email verification failed",
        });
      }
    } catch (error) {
      console.error("error in email verification", error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const user = await User.findOne({ email: req.body.email });
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
                  id: user._id,
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
      return res.status(500);
    }
  }

  async update(req: Request, res: Response) {
    const user = await User.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          phone: req.body.phone,
          whatINeed: req.body.whatINeed,
        },
      }
    );
    if (user.acknowledged) {
      const newuser = await User.findOne({ _id: req.params.id });
      const token: string = jwt.sign(
        {
          id: newuser?._id,
          phone: newuser?.phone,
          email: newuser?.email,
        },
        process.env.JWT_SECRET as string
      );
      res.status(200).json({
        message: "success",
        token: token,
      });
    } else {
      res.status(404).json({
        message: "user not found",
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
      const user = await User.findOne({ _id: req.params.id });
      if (user?.avatar !== null) {
        const filePathToDelete = path.join(
          __dirname,
          "uploads/client/profileImages",
          user?.avatar.doc
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
      const image = {
        doc: profileImage[1].name,
        key: profileImage[0],
      };

      const updatedUser = await User.updateOne(
        {
          _id: req.params.id,
        },
        {
          $set: {
            avatar: image,
          },
        }
      );

      if (updatedUser.acknowledged) {
        const newuser = await User.findOne({ _id: req.params.id });
        const token: string = jwt.sign(
          {
            id: newuser?._id,
            phone: newuser?.phone,
            email: newuser?.email,
          },
          process.env.JWT_SECRET as string
        );
        res.status(200).json({
          message: "success",
          token: token,
        });
      } else {
        res.status(404).json({
          message: "user not found",
        });
      }
    } catch (error) {
      console.error("error uploading profile image", error);
    }
  }

  async updatePassword(req: Request, res: Response) {
    let user = await User.findOne({ _id: req.params.id });
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
  }

  async user(req: Request, res: Response) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({
          message: "user not found",
        });
      }
    } catch (error) {
      console.error("error fetching user", error);
    }
  }

  async users(req: Request, res: Response) {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      if (users) {
        return res.status(200).json(users);
      } else {
        return res.status(404).json({
          message: "no user found",
        });
      }
    } catch (error) {
      console.error("error fetching users", error);
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const resetToken: string = jwt.sign(
          {
            id: user._id,
            email: user.email,
            phone: user.phone,
          },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "1h",
          }
        );
        const url = `${process.env.FRONTEND_URL}/new-password/${resetToken}`;
        // write send mail function here
        // sendEmail({
        //   to: user.email as string,
        //   subject: "Deonicode: Password Reset",
        //   message: forgotPasswordEmail(user.username as string, url),
        // });
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
    }
  }

  async newPassword(req: Request, res: Response) {
    try {
      let user = await User.findOne({ _id: req.params.id });
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
    }
  }
}

export default UserController;
