const { Usuario } = require('../models');
const { Op } = require('sequelize');

const UsuarioController = {

    perfil: async (req, res, next) => {
        const { idPerfil } = res.locals;

        if (res.statusCode === 200) {
            const usuario = await Usuario.findByPk(idPerfil);

            if (usuario) {
                return res.render('perfil', {
                    titulo: 'Perfil',
                    usuarioPagina: usuario,
                });
            }
        }
        next();
    },

    buscar: async (req, res) => {
        const nomesDeBusca = req.body.nomeParaBuscar.split(' ');

        /* A linha abaixo basicamente serve como um 'OR' com todas as palavras recebidas como parâmetro */
        const nomesRegex = nomesDeBusca.join('|');

        const usuarios = await Usuario.findAll({
            where: {
                [Op.or]: [{
                        nome: {
                            [Op.regexp]: nomesRegex,
                        }
                    },
                    {
                        apelido: {
                            [Op.regexp]: nomesRegex,
                        }
                    },
                ],
            },
            attributes: ['id', 'nome', 'apelido', 'imagem_url'],
        });

        console.log(usuarios);
        

        res.render('pesquisa', {
            titulo: 'Pesquisa',
            usuariosBusca: usuarios,
        });

    },

    editar: async (req, res, next) => {
        const { idPerfil } = res.locals;

        if (res.statusCode === 200) {
            const usuario = await Usuario.findByPk(idPerfil);

            if (usuario) {
                return res.render('perfil-editar', {
                    titulo: 'Perfil - Editar',
                    usuarioPagina: usuario,
                });
            }
        }
        next();
    },

};

module.exports = UsuarioController;