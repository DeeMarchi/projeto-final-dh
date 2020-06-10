const { Roteiro } = require('../models');

const CurtidaController = {

    curtirRoteiro: async (req, res) => {
        const { usuario } = req.session;
        const { id } = req.body;

        const roteiro = await Roteiro.findByPk(id);
        ++roteiro.likes;

        await roteiro.save();
        
        
    },

};

module.exports = CurtidaController;