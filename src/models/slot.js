'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Slot.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    expertId: {
      type: DataTypes.STRING,
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
    });
  return Slot;
};