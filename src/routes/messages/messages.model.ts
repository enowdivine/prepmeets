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
      tableName: "messages", // explicitly set the table name
      modelName: "Message", // explicitly set modelName
    }
  );
  await Message.sync({ alter: true });
};
