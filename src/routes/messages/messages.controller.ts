import { Request, Response } from "express";
import Messages, { MessageMap } from "./messages.model";
import sequelizeDB from "../../config/db";

class MessagesController {
  async newMessage(req: Request, res: Response) {
    try {
      const message = {
        conversationId: req.body.conversationId,
        senderId: req.body.senderId,
        receiverId: req.body.receiverId,
        message: req.body.message,
      };
      MessageMap(sequelizeDB);
      const savedMessage = await Messages.create(message);
      res.status(200).json(savedMessage);
    } catch (error) {
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async getUserMessages(req: Request, res: Response) {
    try {
      MessageMap(sequelizeDB);
      const messages = await Messages.findAll({
        where: { conversationId: req.params.id },
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
