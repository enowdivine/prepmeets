import { Sequelize, DataTypes, Model } from "sequelize";

export default class Conversation extends Model {
  public id?: number;
  public members?: Array<String> | [];
}

export const ConversationMap = async (sequelize: Sequelize) => {
  Conversation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      members: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: "Conversation",
    }
  );
  await Conversation.sync({ alter: true });
};
