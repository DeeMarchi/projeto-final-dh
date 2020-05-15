'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('imagem_roteiro', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            roteiro_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'roteiro',
                    key: 'id',
                },
            },
            url: Sequelize.TEXT,
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('imagem_roteiro');
    }
};
