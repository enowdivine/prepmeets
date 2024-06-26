import { Sequelize, DataTypes, Model } from "sequelize";

export default class Rating extends Model {
  public id?: number;
  public expertId?: string;
  public userId?: string;
  public rating?: number;
  public comment?: string;
}

export const RatingMap = async (sequelize: Sequelize) => {
  Rating.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      expertId: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      userId: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      comment: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      sequelize,
      // tableName: "ratings",
      modelName: "Rating",
    }
  );
  await Rating.sync({ alter: true });
};
