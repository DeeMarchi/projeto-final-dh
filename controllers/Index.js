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
        const membros = [
            {
                nome: 'Denner Marchi',
                contato: {
                    gitHub: 'https://github.com/DeeMarchi',
                    discord: 'DeeMarchi#8073',
                    linkedIn: 'https://www.linkedin.com/in/denner-marchi-33a713176/',
                },
                descricao: 'Gosto de programação de baixo nível e também acho interessante segurança da informação.',
            },
            {
                nome: 'Oto Campos',
                contato: {
                    gitHub: 'https://github.com/otocampos',
                    discord: 'otocampos#0386',
                    linkedIn: 'https://www.linkedin.com/in/oto-campos/',
                },
                descricao: 'Apaixonado por tecnologia e viagens. Dedico este projeto primeiramente a Jesus, meus familiares e minha Noiva.'
            },
        ];

        res.render('sobre', {
            titulo: 'Sobre',
            membros,
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