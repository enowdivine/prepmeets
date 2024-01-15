import { Sequelize, DataTypes, Model } from "sequelize";

export default class Message extends Model {
  public id?: number;
  public conversationId?: string;
  public senderId?: string;
  public receiverId?: string;
  public message?: string;
}

export const MessageMap = (sequelize: Sequelize) => {
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
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
  Message.sync();
};
