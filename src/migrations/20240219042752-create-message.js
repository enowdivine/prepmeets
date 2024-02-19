'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      conversationId: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      senderId: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      receiverId: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      message: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};