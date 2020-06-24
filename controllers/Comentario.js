const {
    Estilo,
    Moeda,
    Roteiro,
    Dia,
    Local,
    ImagemRoteiro,
    Comentario,
    CurtidaComentario
} = require('../models')
const moment = require('moment')
const comentarioController = {


    criarComentario: async (req, res) => {
        let {
            comentario
        } = req.body
        let idRoteiro = req.params.id

        let dado = await Comentario.create({
            conteudo: comentario,
            usuario_id: req.session.usuario.id,
            roteiro_id: idRoteiro
        })
        res.redirect('back')
    },
    curtirComentarioRoteiro: async (req, res) => {

        idComentario = req.params.id

        let curtidaComentario = await CurtidaComentario.findOne({
            where: {
                usuario_id: req.session.usuario.id,
                comentario_id: idComentario
            }
        })

        if (curtidaComentario == undefined) {
            let comentario = await Comentario.findByPk(idComentario)

            comentario.likes = ++comentario.likes;
            await comentario.save();

            await CurtidaComentario.create({
                comentario_id: idComentario,
                usuario_id: req.session.usuario.id
            })
            res.status(201).send(`Like${idComentario}`)


        } else {
            let comentario = await Comentario.findByPk(idComentario)
            comentario.likes = --comentario.likes;
            await comentario.save();

            await CurtidaComentario.destroy({
                where: {
                    usuario_id: req.session.usuario.id,
                    comentario_id: idComentario
                }
            });
            res.status(200).send(`Deslike${idComentario}`);
        }





    },



};

module.exports = comentarioController;