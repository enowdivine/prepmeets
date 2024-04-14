import { Sequelize, DataTypes, Model } from "sequelize";

export default class Session extends Model {
  public id?: number;
  public expertId?: string;
  public clientId?: string;
  public roomId?: string;
  public sessionType?: string;
  public paymentType?: string;
  public paymentAmount?: number;
  public duration?: string;
  public sessionDate?: Date;
  public sessionStatus?: string;
  public sessionLink?: string;
  public paymentStatus?: string;
  public prepmeetCommission?: number;
}

export const SessionMap = async (sequelize: Sequelize) => {
  Session.init(
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
      clientId: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      roomId: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      sessionType: {
        type: DataTypes.STRING,
        defaultValue: 0,
      },
      paymentType: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      paymentAmount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      duration: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      sessionDate: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      sessionStatus: {
        type: DataTypes.STRING,
        defaultValue: "PENDING",
      },
      sessionLink: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      paymentStatus: {
        type: DataTypes.STRING,
        defaultValue: "PENDING",
      },
      prepmeetCommission: {
        type: DataTypes.INTEGER,
        defaultValue: 15,
      },
    },
    {
      sequelize,
      // tableName: "sessions",
      modelName: "Session",
    }
  );
  await Session.sync({ alter: true });
};
