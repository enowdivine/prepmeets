import { Sequelize, DataTypes, Model } from "sequelize";

export default class Subscription extends Model {
  public id?: number;
  public email?: string;
}

export const SubscriptionMap = (sequelize: Sequelize) => {
  Subscription.init(
    {
      id: {
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
      tableName: "subscriptions", // explicitly set the table name
      modelName: "Subscription", // explicitly set modelName
    }
  );
  Subscription.sync();
};
