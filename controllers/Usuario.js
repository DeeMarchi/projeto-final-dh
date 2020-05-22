const {
    Usuario
} = require('../models');
const {
    Op
} = require('sequelize');

const UsuarioController = {

    perfil: async (req, res, next) => {
        let {
            id
        } = req.params;
        id = Number(id);

        if (Number.isInteger(id)) {
            const usuario = await Usuario.findByPk(id);

            if (usuario) {
                return res.render('perfil', {
                    titulo: 'Perfil',
                    usuarioPagina: usuario,
                });
            }
        }
        res.status(404);
        return next();
    },

    buscar: async (req, res) => {
        const nomesDeBusca = req.body.nomeParaBuscar.split(' ');
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

};

module.exports = UsuarioController;