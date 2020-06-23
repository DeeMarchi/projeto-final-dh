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
        let { comentario } = req.body
        let idRoteiro = req.params.id

       let dado = await Comentario.create({ conteudo: comentario, usuario_id: req.session.usuario.id, roteiro_id: idRoteiro })
res.redirect('back')
    },
    curtirComentarioRoteiro: async (req, res) => {

      idComentario = req.params.id

        
        
        let comentario = await Comentario.findByPk(idComentario)
        
        comentario.likes = ++comentario.likes;
        await comentario.save();

        await CurtidaComentario.create({comentario_id:idComentario,usuario_id:req.session.usuario.id})

        res.redirect('back')



    },

    

};

module.exports = comentarioController;