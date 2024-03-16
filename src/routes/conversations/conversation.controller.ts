import { Request, Response } from "express";
import { Op } from "@sequelize/core";
const db = require("../../models/index");
import { AuthenticatedRequest } from "../../middleware/auth/verifyToken";

class ConversationController {
  async createConversation(req: Request, res: Response) {
    try {
      const existingConversation = await db.Conversation.findOne({
        where: {
          members: [req.body.senderId, req.body.receiverId],
        },
      });
      if (existingConversation) {
        return res.status(200).json(existingConversation);
      }
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

  async getUserConversations(req: AuthenticatedRequest, res: Response) {
    try {
      const conversations = await db.Conversation.findAll({
        where: {
          members: {
            [Op.contains]: [req.id],
          },
        },
      });

      const updatedConversations = await Promise.all(
        conversations.map(async (conversation: any) => {
          const memberIds = conversation.members;

          // Fetch user data for each member
          const users = await Promise.all(
            memberIds.map(async (userId: any) => {
              // Fetch user data from the database
              const user = await db.User.findByPk(userId);
              // Return user data
              return user;
            })
          );

          // Replace member IDs with user data
          const updatedMembers = users.map((user) => ({
            id: user.id,
            role: user.role,
            avatar: user.avatar,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
          }));

          // Fetch the last message for the conversation
          const lastMessage = await db.Message.findOne({
            where: {
              conversationId: conversation.id,
            },
            order: [["createdAt", "DESC"]],
          });

          // Replace member IDs in the conversation object with user data
          const updatedConversation = {
            ...conversation.toJSON(),
            members: updatedMembers,
            lastMessage: lastMessage ? lastMessage.toJSON() : null,
          };

          return updatedConversation;
        })
      );

      return res.status(200).json(updatedConversations);
    } catch (error) {
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }
}

export default ConversationController;
