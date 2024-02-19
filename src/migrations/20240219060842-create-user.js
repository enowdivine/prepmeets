'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: "client",
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
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
      whatINeed: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      location: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      password: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      emailConfirmed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};