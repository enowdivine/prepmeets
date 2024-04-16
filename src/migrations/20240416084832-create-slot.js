'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Slots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      expertId: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      start: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      end: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      available: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      selected: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('Slots');
  }
};