import { Request, Response } from "express";
const db = require("../../models/index");
import _ from "lodash";
import { AuthenticatedExpertRequest } from "../../middleware/auth/verifyExpert";
import { AuthenticatedClientRequest } from "../../middleware/auth/verifyUser";
import { AuthenticatedRequest } from "../../middleware/auth/verifyToken";

class SessionController {
  async create(req: Request, res: Response) {
    try {
      const booking = {
        expertId: req.body.expertId,
        clientId: req.body.clientId,
        sessionType: req.body.sessionType,
        paymentType: req.body.paymentType,
        paymentAmount: req.body.paymentAmount,
        duration: req.body.duration,
        sessionDate: req.body.sessionDate,
        sessionStatus: req.body.sessionStatus,
        paymentStatus: req.body.paymentStatus,
      };
      db.Session.create(booking)
        .then((booking: any) => {
          res.status(201).json({
            message: "success",
            booking,
          });
        })
        .catch((err: any) => {
          res.status(500).json({
            message: "an error occured",
            error: err,
          });
        });
    } catch (error) {
      console.error("booking failed", error);
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async session(req: Request, res: Response) {
    try {
      const session = await db.Session.findOne({
        where: { id: req.params.id },
      });
      if (session) {
        return res.status(200).json(session);
      } else {
        return res.status(404).json({
          message: "session not found",
        });
      }
    } catch (error) {
      console.error("error fetching session", error);
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async clientSessions(req: AuthenticatedClientRequest, res: Response) {
    try {
      const session = await db.Session.findAll({
        where: { clientId: req.id },
      });
      if (session) {
        return res.status(200).json(session);
      } else {
        return res.status(404).json({
          message: "session not found",
        });
      }
    } catch (error) {
      console.error("error fetching session", error);
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async expertSessions(req: AuthenticatedExpertRequest, res: Response) {
    try {
      const session = await db.Session.findAll({
        where: { expertId: req.id },
      });
      if (session) {
        return res.status(200).json(session);
      } else {
        return res.status(404).json({
          message: "session not found",
        });
      }
    } catch (error) {
      console.error("error fetching session", error);
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async sessions(req: Request, res: Response) {
    try {
      const sessions = await db.Session.findAll();
      if (sessions) {
        return res.status(200).json(sessions);
      } else {
        return res.status(404).json({
          message: "no user found",
        });
      }
    } catch (error) {
      console.error("error fetching sessions", error);
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async updateStatus(req: AuthenticatedRequest, res: Response) {
    try {
      const session = await db.Session.findOne({
        where: { id: req.id },
      });
      if (session) {
        session.sessionStatus = req.body.sessionStatus;
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
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }
}

export default SessionController;
