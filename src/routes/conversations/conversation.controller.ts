import { Request, Response } from "express";
import Conversation from "./conversation.model";

class ConversationController {
  async createConversation(req: Request, res: Response) {
    try {
      const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
      });

      const savedConversation = await newConversation.save();
      return res.status(200).json(savedConversation);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getUserConversations(req: Request, res: Response) {
    try {
      const conversations = await Conversation.find({
        members: { $in: [req.params.id] },
      });
      return res.status(200).json(conversations);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default ConversationController;
