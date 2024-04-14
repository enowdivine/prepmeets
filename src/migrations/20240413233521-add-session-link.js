'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Sessions', 'sessionLink', {
            type: Sequelize.STRING,
            defaultValue: "",
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Sessions', 'sessionLink');
    },
};