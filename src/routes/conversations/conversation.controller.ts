import { Request, Response } from "express";
import { Op } from "@sequelize/core";
const db = require("../../models/index");

class ConversationController {
  async createConversation(req: Request, res: Response) {
    try {
      const newConversation = {
        members: [req.body.senderId, req.body.receiverId],
      };
      const savedConversation = await db.Conversation.create(newConversation);
      return res.status(200).json(savedConversation);
    } catch (error) {
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async getUserConversations(req: Request, res: Response) {
    try {
      const conversations = await db.Conversation.findAll({
        where: {
          members: {
            [Op.contains]: [req.params.id],
          },
        },
      });
      return res.status(200).json(conversations);
    } catch (error) {
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }
}

export default ConversationController;
