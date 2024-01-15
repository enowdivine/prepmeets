import { Request, Response } from "express";
import Conversation, { ConversationMap } from "./conversation.model";
import sequelizeDB from "../../config/db";

class ConversationController {
  async createConversation(req: Request, res: Response) {
    try {
      const newConversation = {
        members: [req.body.senderId, req.body.receiverId],
      };
      ConversationMap(sequelizeDB);
      const savedConversation = await Conversation.create(newConversation);
      return res.status(200).json(savedConversation);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getUserConversations(req: Request, res: Response) {
    try {
      ConversationMap(sequelizeDB);
      const conversations = await Conversation.findAll({
        where: { members: { $in: [req.params.id] } },
      });
      return res.status(200).json(conversations);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default ConversationController;
