'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('moeda', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            simbolo: {
                type: Sequelize.STRING(3),
                allowNull: false,
                unique: true,
            },
            nome: {
                type: Sequelize.STRING(80),
                allowNull: false,
                unique: true,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('moeda');
    }
};
