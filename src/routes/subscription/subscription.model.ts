import { Sequelize, DataTypes, Model } from "sequelize";

export default class Subscription extends Model {
  public id?: number;
  public email?: string;
}

export const SubscriptionMap = async (sequelize: Sequelize) => {
  Subscription.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      sequelize,
      // tableName: "subscriptions",
      modelName: "Subscription",
    }
  );
  await Subscription.sync({ alter: true });
};
