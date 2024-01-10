import { Request, Response } from "express";
import Messages from "./messages.model";

class MessagesController {
  async newMessage(req: Request, res: Response) {
    try {
      const message = new Messages(req.body);
      const savedMessage = await message.save();
      res.status(200).json(savedMessage);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getUserMessages(req: Request, res: Response) {
    try {
      const messages = await Messages.find({
        conversationId: req.params.id,
      });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default MessagesController;
