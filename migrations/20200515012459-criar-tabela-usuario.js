'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('usuario', {
            id:  {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            nome: {
                type: Sequelize.STRING(200),
                allowNull: false,
                unique: true,
            },
            usuario: {
                type: Sequelize.STRING(35),
                allowNull: false,
                unique: true,
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true,
            },
            senha: {
                type: Sequelize.STRING(250),
                allowNull: false,
            },
            imagem_url: {
                type: Sequelize.TEXT,
                defaultValue: '/icones/componentes/usuario/user.svg',
                allowNull: false,
            },
            resumo: {
                type: Sequelize.TEXT,
                defaultValue: null,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('usuario');
    }
};
