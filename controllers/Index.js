const {
    Roteiro,
    Estilo,
    Usuario,
    ImagemRoteiro,
} = require('../models');

const moment = require ('moment')

const IndexController = {

    home: async (req, res) => {
        const roteiros = await Roteiro.findAll({
            where: {
                ativo: true,
            },
            include: [{
                    model: Usuario,
                    as: 'usuario',
                    required: true,
                }, {
                    model: Estilo,
                    as: 'estilo',
                    required: true,
                }, {
                    model: ImagemRoteiro,
                    as: 'imagens',
                },
            ],
            order: [
                ['id', 'DESC'],
            ],
        });

        res.render('home', {
            titulo: 'Home',
            roteiros,
            moment,
        });
    },

    sobre: (req, res) => {
        res.render('sobre', {
            titulo: 'Sobre',
        });
    },

    pesquisa: (req, res) => {
        res.render('pesquisa', {
            titulo: 'Pesquisa',
        });
    },

    pesquisaUsuarios: (req, res) => {
        res.render('pesquisa-usuarios', {
            titulo: 'Pesquisa | Usuários',
        });
    },

    pesquisaRoteiros: (req, res) => {
        res.render('pesquisa-roteiros', {
            titulo: 'Pesquisa | Roteiros',
        });
    },

    sair: (req, res) => {
        req.session.usuario = undefined;
        res.redirect('/');
    },
};

module.exports = IndexController;