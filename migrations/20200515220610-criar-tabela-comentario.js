'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('comentario', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            conteudo: {
                type: Sequelize.TEXT,
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
            usuario_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'usuario',
                    key: 'id',
                },
            },
            likes: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('comentario');
    }
};
