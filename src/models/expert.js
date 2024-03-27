'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Expert.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "expert",
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    introvideo: {
      type: DataTypes.STRING,
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
    password: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    emailConfirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    bio: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    education: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
      defaultValue: [],
    },
    experience: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
      defaultValue: [],
    },
    certificates: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
      defaultValue: [],
    },

    gender: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    location: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    focusarea: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },

    havecertifications: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    timeNotice: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    calenderSlots: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
      defaultValue: [],
    },
    pricing: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null,
    },

    trialSessions: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    visibilityLevel: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    payments: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
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
      modelName: "Expert",
    });
  return Expert;
};