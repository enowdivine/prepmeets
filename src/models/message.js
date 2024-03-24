'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Message.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    conversationId: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    senderId: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    receiverId: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    message: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
  },
    {
      sequelize,
      modelName: "Message",
    });
  return Message;
};