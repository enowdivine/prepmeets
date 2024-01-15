import { Sequelize, DataTypes, Model } from "sequelize";

export default class Session extends Model {
  public id?: number;
  public expertId?: string;
  public clientId?: string;
  public sessionType?: string;
  public paymentType?: string;
  public paymentAmount?: string;
  public duration?: string;
  public sessionDate?: Date;
  public sessionStatus?: string;
  public paymentStatus?: string;
  public prepmeetCommission?: number;
}

export const SessionMap = (sequelize: Sequelize) => {
  Session.init(
    {
      id: {
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
      sessionType: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      paymentType: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      paymentAmount: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      duration: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      sessionDate: {
        type: DataTypes.DATE,
        defaultValue: 0,
      },
      sessionStatus: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      paymentStatus: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      prepmeetCommission: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "sessions", // explicitly set the table name
      modelName: "Session", // explicitly set modelName
    }
  );
  Session.sync();
};
