import { Request, Response } from "express";
import { Op } from "@sequelize/core";
const db = require("../../models/index");
import { AuthenticatedRequest } from "../../middleware/auth/verifyToken";

class ConversationController {
  async createConversation(req: Request, res: Response) {
    try {
      const senderId = req.body.senderId;
      const senderRole = req.body.senderRole;
      const receiverId = req.body.receiverId;
      const receiverRole = req.body.receiverRole;

      const sender = JSON.stringify({ id: senderId, role: senderRole });
      const receiver = JSON.stringify({ id: receiverId, role: receiverRole });

      const members = [sender, receiver];

      const existingConversation = await db.Conversation.findOne({
        where: {
          members: {
            [Op.contains]: members,
          },
        },
      });

      if (existingConversation) {
        // changes
        const members = existingConversation.members;
        const usersPromises = members.map(async (member: any) => {
          const memberObj = JSON.parse(member);
          const memberId = JSON.parse(memberObj.id);

          if (memberObj.role === "client") {
            const user = await db.User.findByPk(memberId);
            return user;
          } else {
            const user = await db.Expert.findByPk(memberId);
            return user;
          }
        });
        const users = await Promise.all(usersPromises);

        const updatedMembers = users.map((user) => {
          if (user) {
            const jsonUser = user.toJSON();
            return {
              id: jsonUser.id,
              role: jsonUser.role,
              avatar: jsonUser.avatar,
              firstname: jsonUser.firstname,
              lastname: jsonUser.lastname,
              email: jsonUser.email,
              phone: jsonUser.phone,
            };
          } else {
            return null;
          }
        });

        const updatedConversation = {
          ...existingConversation.toJSON(),
          members: updatedMembers,
        };
        // changes
        return res.status(200).json(updatedConversation);
      }

      const newConversation = {
        members,
      };

      // creating new conversation
      const savedConversation = await db.Conversation.create(newConversation);
      // changes
      const membersArr = savedConversation.members;
      const usersPromises = membersArr.map(async (member: any) => {
        const memberObj = JSON.parse(member);
        const memberId = JSON.parse(memberObj.id);

        if (memberObj.role === "client") {
          const user = await db.User.findByPk(memberId);
          return user;
        } else {
          const user = await db.Expert.findByPk(memberId);
          return user;
        }
      });
      const users = await Promise.all(usersPromises);

      const updatedMembers = users.map((user) => {
        if (user) {
          const jsonUser = user.toJSON();
          return {
            id: jsonUser.id,
            role: jsonUser.role,
            avatar: jsonUser.avatar,
            firstname: jsonUser.firstname,
            lastname: jsonUser.lastname,
            email: jsonUser.email,
            phone: jsonUser.phone,
          };
        } else {
          return null;
        }
      });

      const updatedConversation = {
        ...savedConversation.toJSON(),
        members: updatedMembers,
      };
      // changes
      return res.status(200).json(updatedConversation);
    } catch (error) {
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async getUserConversations(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = JSON.stringify(req.id);
      const userRole = req.role;
      const user = JSON.stringify({ id: userId, role: userRole });

      const conversations = await db.Conversation.findAll({
        where: {
          members: {
            [Op.contains]: [user],
          },
        },
      });

      const updatedConversations = await Promise.all(
        conversations.map(async (conversation: any) => {
          const members = conversation.members;

          const usersPromises = members.map(async (member: any) => {
            const memberObj = JSON.parse(member);
            const memberId = JSON.parse(memberObj.id);

            if (memberObj.role === "client") {
              const user = await db.User.findByPk(memberId);
              return user;
            } else {
              const user = await db.Expert.findByPk(memberId);
              return user;
            }
          });
          const users = await Promise.all(usersPromises);

          const updatedMembers = users.map((user) => {
            if (user) {
              const jsonUser = user.toJSON();
              return {
                id: jsonUser.id,
                role: jsonUser.role,
                avatar: jsonUser.avatar,
                firstname: jsonUser.firstname,
                lastname: jsonUser.lastname,
                email: jsonUser.email,
                phone: jsonUser.phone,
              };
            } else {
              return null;
            }
          });

          const lastMessage = await db.Message.findOne({
            where: {
              conversationId: JSON.stringify(conversation.id),
            },
            order: [["createdAt", "DESC"]],
          });

          const updatedConversation = {
            ...conversation.toJSON(),
            members: updatedMembers,
            lastMessage: lastMessage ? lastMessage.toJSON() : null,
          };

          return updatedConversation;
        })
      );

      // Sort the conversations based on the createdAt of their last messages
      const sortedConversations = updatedConversations.sort((a, b) => {
        if (!a.lastMessage) return 1;
        if (!b.lastMessage) return -1;
        return (
          new Date(b.lastMessage.createdAt).getTime() -
          new Date(a.lastMessage.createdAt).getTime()
        );
      });

      return res.status(200).json(sortedConversations);
    } catch (error) {
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }
}

export default ConversationController;
