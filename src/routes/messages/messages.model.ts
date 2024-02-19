import { Sequelize, DataTypes, Model } from "sequelize";

export default class Message extends Model {
  public id?: number;
  public conversationId?: string;
  public senderId?: string;
  public receiverId?: string;
  public message?: string;
}

export const MessageMap = async (sequelize: Sequelize) => {
  Message.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      conversationId: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      senderId: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      receiverId: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      message: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      sequelize,
      // tableName: "messages",
      modelName: "Message",
    }
  );
  await Message.sync({ alter: true });
};
