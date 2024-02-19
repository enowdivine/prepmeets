'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Experts', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: "expert",
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      introvideo: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      firstname: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      lastname: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      phone: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      password: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      emailConfirmed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      bio: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      education: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: true,
        defaultValue: [],
      },
      experience: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: true,
        defaultValue: [],
      },
      certificates: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: true,
        defaultValue: [],
      },

      gender: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      location: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      focusarea: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        defaultValue: [],
      },

      havecertifications: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      timeNotice: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      timezone: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "",
      },
      calenderSlots: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: true,
        defaultValue: [],
      },
      pricing: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: null,
      },

      trialSessions: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      visibilityLevel: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      payments: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: null,
      },
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },

      // social login fields
      accountId: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      provider: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Experts');
  }
};