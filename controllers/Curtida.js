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
                return res.status(201).send('Roteiro curtido');
            } else {
                return res.status(400).send('Você já curtiu este roteiro!');
            }
        }
        catch (erro) {
            console.log(erro.msg);
        }


    },
};

module.exports = CurtidaController;