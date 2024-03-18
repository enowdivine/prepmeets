import { Request, Response } from "express";
const db = require("../../models/index");
import { AuthenticatedRequest } from "../../middleware/auth/verifyToken";

class MessagesController {
  async newMessage(req: Request, res: Response) {
    try {
      const message = {
        conversationId: req.body.conversationId,
        senderId: req.body.senderId,
        receiverId: req.body.receiverId,
        message: req.body.message,
      };
      const savedMessage = await db.Message.create(message);
      res.status(200).json(savedMessage);
    } catch (error) {
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async getUserMessages(req: AuthenticatedRequest, res: Response) {
    try {
      const messages = await db.Message.findAll({
        where: { conversationId: req.id },
      });
      res.status(200).json(messages);
    } catch (error) {
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }
}

export default MessagesController;
