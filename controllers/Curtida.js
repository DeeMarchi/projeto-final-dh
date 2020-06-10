const { Roteiro } = require('../models');

const CurtidaController = {

    curtirRoteiro: async (req, res) => {
        const { usuario } = req.session;
        const { id } = req.body;

        console.log(`id usuário === ${usuario.id}`);
        console.log(`id roteiro === ${id}`);
        
        
    },

};

module.exports = CurtidaController;