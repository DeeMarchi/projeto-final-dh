'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Estilo', [
            { nome: 'Aventureiro' },
            { nome: 'Casual' },
            { nome: 'Romântico' },
            { nome: 'Praieiro' },
            { nome: 'Misto' },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Estilo', null, {});
    }
};
