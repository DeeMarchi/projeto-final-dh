'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('local', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            nome: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            dia_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'dia',
                    key: 'id',
                },
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('local');
    }
};
