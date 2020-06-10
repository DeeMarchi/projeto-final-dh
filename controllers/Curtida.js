const { Op } = require('sequelize');
const { Roteiro, Curtida } = require('../models');

const CurtidaController = {

    curtirRoteiro: async (req, res) => {
        const { usuario } = req.session;
        const { id } = req.body;
        const idInt = Number(id);

        try {
            const roteiro = await Roteiro.findByPk(idInt, {
                include: [{
                    model: Curtida,
                    as: 'curtida',
                    required: false,
                    where: {
                        usuario_id: usuario.id,
                    },
                }],
            });
            if (roteiro.curtida.length === 0) {
                await Curtida.create({
                    usuario_id: usuario.id,
                    roteiro_id: idInt,
                    data: new Date(),
                });
                ++roteiro.likes;
                await roteiro.save();
            } else {
                console.log('else code block');
            }
        }
        catch (erro) {
            console.log(erro.msg);
        }


    },
};

module.exports = CurtidaController;