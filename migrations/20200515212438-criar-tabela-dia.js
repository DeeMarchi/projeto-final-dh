'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('dia', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            resumo: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            gasto: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            moeda_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'moeda',
                    key: 'id',
                },
            },
            roteiro_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'roteiro',
                    key: 'id',
                },
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('dia');
    }
};
