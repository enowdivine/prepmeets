import { Request, Response } from "express";
const db = require("../../models/index");

class MailController {
  async subscribe(req: Request, res: Response) {
    try {
      const mail = await db.Subscription.findOne({
        where: { email: req.body.email },
      });
      if (mail) {
        return res.status(409).json({
          message: "email already exist",
        });
      }
      const subscriber = {
        email: req.body.email,
      };
      await db.Subscription.create(subscriber)
        .then(() => {
          res.status(201).json({
            message: "success",
          });
        })
        .catch((err: any) => {
          res.status(500).json({
            message: "an error occured",
            error: err,
          });
        });
    } catch (error) {
      console.error("an error occured", error);
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async subsribers(req: Request, res: Response) {
    try {
      const subsccribers = await db.Subscription.findAll();
      if (subsccribers) {
        return res.status(200).json(subsccribers);
      } else {
        return res.status(404).json({
          message: "no subscriber found",
        });
      }
    } catch (error) {
      console.error("error fetching subsccribers", error);
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async unsubscribe(req: Request, res: Response) {
    try {
      await db.Subscription.destroy({
        where: { email: req.body.email },
      }).then((deletedRows: any) => {
        if (deletedRows > 0) {
          res.status(200).json({
            message: "success",
          });
        } else {
          res.status(404).json({
            message: "email not found",
          });
        }
      });
    } catch (error) {
      console.error("error unsubscribing", error);
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }
}

export default MailController;
