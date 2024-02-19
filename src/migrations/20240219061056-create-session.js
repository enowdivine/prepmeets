'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      expertId: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      clientId: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      sessionType: {
        type: Sequelize.STRING,
        defaultValue: 0,
      },
      paymentType: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      paymentAmount: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      duration: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      sessionDate: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      sessionStatus: {
        type: Sequelize.STRING,
        defaultValue: "pending",
      },
      paymentStatus: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      prepmeetCommission: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    await queryInterface.dropTable('Sessions');
  }
};