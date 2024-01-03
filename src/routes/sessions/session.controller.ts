import { Request, Response } from "express";
import Session from "./session.model";
import _ from "lodash";

class SessionController {
  async create(req: Request, res: Response) {
    try {
      const booking = new Session({
        expertId: req.body.expertId,
        clientId: req.body.clientId,
        sessionType: req.body.sessionType,
        paymentType: req.body.paymentType,
        paymentAmount: req.body.paymentAmount,
        duration: req.body.duration,
        sessionDate: req.body.sessionDate,
        sessionStatus: req.body.sessionStatus,
        paymentStatus: req.body.paymentStatus,
      });
      booking
        .save()
        .then((response) => {
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
      console.error("booking failed", error);
    }
  }

  async session(req: Request, res: Response) {
    try {
      const session = await Session.findOne({ _id: req.params.id });
      if (session) {
        return res.status(200).json(session);
      } else {
        return res.status(404).json({
          message: "session not found",
        });
      }
    } catch (error) {
      console.error("error fetching session", error);
    }
  }

  async sessions(req: Request, res: Response) {
    try {
      const sessions = await Session.find().sort({ createdAt: -1 });
      if (sessions) {
        return res.status(200).json(sessions);
      } else {
        return res.status(404).json({
          message: "no user found",
        });
      }
    } catch (error) {
      console.error("error fetching sessions", error);
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const session = await Session.findOne({ _id: req.params.id });
      if (session) {
        session.sessionStatus = req.body.status;
        await session.save().then(async () => {
          return res.status(200).json({
            message: "session status updated",
          });
        });
      } else {
        return res.status(404).json({
          message: "session not found",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default SessionController;
