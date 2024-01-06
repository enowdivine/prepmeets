import { Request, Response } from "express";
import Subscription from "./subscription.model";

class MailController {
  async subscribe(req: Request, res: Response) {
    try {
      const mail = await Subscription.findOne({ email: req.body.email });
      if (mail) {
        return res.status(409).json({
          message: "email already exist",
        });
      }
      const subscriber = new Subscription({
        email: req.body.email,
      });
      await subscriber
        .save()
        .then(() => {
          res.status(201).json({
            message: "success",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "an error occured",
            error: err,
          });
        });
    } catch (error) {
      console.error("an error occured", error);
    }
  }

  async subsribers(req: Request, res: Response) {
    try {
      const subsccribers = await Subscription.find({}).sort({ createdAt: -1 });
      if (subsccribers) {
        return res.status(200).json(subsccribers);
      } else {
        return res.status(404).json({
          message: "no subscriber found",
        });
      }
    } catch (error) {
      console.error("error fetching subsccribers", error);
    }
  }

  async unsubscribe(req: Request, res: Response) {
    try {
      const response = await Subscription.deleteOne({ email: req.body.email });
      if (response.deletedCount > 0) {
        res.status(200).json({
          message: "success",
        });
      } else {
        res.status(404).json({
          message: "email not found",
        });
      }
    } catch (error) {
      console.error("error unsubscribing", error);
    }
  }
}

export default MailController;
