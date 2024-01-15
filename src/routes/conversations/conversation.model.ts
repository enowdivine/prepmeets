import { Sequelize, DataTypes, Model } from "sequelize";

export default class Conversation extends Model {
  public id?: number;
  public members?: Array<JSON>;
}

export const ConversationMap = (sequelize: Sequelize) => {
  Conversation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      members: {
        type: DataTypes.ARRAY,
        defaultValue: [],
      },
    },
    {
      sequelize,
      tableName: "conversations", // explicitly set the table name
      modelName: "Conversation", // explicitly set modelName
    }
  );
  Conversation.sync();
};
