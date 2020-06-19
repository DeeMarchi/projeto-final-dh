'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('roteiro', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            usuario_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'usuario',
                    key: 'id',
                },
            },
            estilo_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'estilo',
                    key: 'id',
                },
            },
            titulo: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            data_inicio: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            data_criacao: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            qntd_dias: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            descricao: {
                type: Sequelize.STRING(1000),
                allowNull: false,
            },
            likes: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            ativo: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: false,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('roteiro');
    }
};
