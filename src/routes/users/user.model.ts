import { Sequelize, DataTypes, Model } from "sequelize";

export default class User extends Model {
  public id?: number;
  public role?: string;
  public avatar?: string;
  public firstname?: string;
  public lastname?: string;
  public email?: string;
  public phone?: number;
  public whatINeed?: string;
  public location?: string;
  public password?: string;
  public emailConfirmed?: boolean;
  public accountId?: string;
  public provider?: string;
}

export const UserMap = async (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "client",
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      firstname: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      lastname: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      whatINeed: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      location: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      password: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      emailConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // social login fields
      accountId: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      provider: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      sequelize,
      tableName: "users", // explicitly set the table name
      modelName: "User", // explicitly set modelName
    }
  );
  await User.sync({ alter: true });
};
