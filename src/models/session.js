'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Session.init({
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
    paymentStatus: {
      type: DataTypes.STRING,
      defaultValue: "PENDING",
    },
    prepmeetCommission: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
    {
      sequelize,
      modelName: "Session",
    });
  return Session;
};