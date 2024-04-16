import { Sequelize, DataTypes, Model } from "sequelize";

export default class Slot extends Model {
  public id?: number;
  public expertId?: number;
  public title?: string;
  public start?: Date;
  public end?: Date;
  public available?: boolean;
  public selected?: boolean;
}

export const SlotsMap = async (sequelize: Sequelize) => {
  Slot.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      expertId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      title: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      start: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      end: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      available: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      selected: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Slot",
    }
  );
  await Slot.sync({ alter: true });
};
