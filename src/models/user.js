'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
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
      modelName: "User",
    });
  return User;
};