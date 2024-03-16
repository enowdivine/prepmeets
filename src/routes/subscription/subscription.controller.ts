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
      let { page, limit } = req.query as any;

      page = page ? parseInt(page, 10) : 1;
      limit = limit ? parseInt(limit, 10) : 10;

      const offset = (page - 1) * limit;

      const subscribers = await db.Subscription.findAndCountAll({
        limit: limit,
        offset: offset,
      });

      if (subscribers.rows.length > 0) {
        const totalPages = Math.ceil(subscribers.count / limit);

        return res.status(200).json({
          subscribers: subscribers.rows,
          totalPages: totalPages,
          currentPage: page,
        });
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
