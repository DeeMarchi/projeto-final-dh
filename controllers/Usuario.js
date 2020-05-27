const { Usuario } = require('../models');
const { Op } = require('sequelize');

const {
    check,
    validationResult,
    body
} = require('express-validator');

const CAMPO_NOVO_RESUMO = 'novoResumo';

/* Proíbe simbolos usados em tags html para evitar XSS persistente ao mostrar o resumo */
const CHARS_PROIBIDOS_REGEX = `[<>/\(\)'";]`;

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

    valicadoes: [
        check(CAMPO_NOVO_RESUMO)
            .isLength({ max: 2000 })
            .withMessage(`o campo ${CAMPO_NOVO_RESUMO} não pode conter mais que 2000 caractéres`)
            .bail()
            .not().matches(CHARS_PROIBIDOS_REGEX)
            .withMessage(`o campo ${CAMPO_NOVO_RESUMO} contém caractéres proibídos!`),
    ],

    atualizar: async (req, res) => {
        const { id } = req.session.usuario;
        const [ novoAvatar ] = req.files;

        console.log(novoAvatar);
        console.log(id);

        console.log(req.body);
        
        







        // const { novoResumo } = req.body;

        // const listaErros = validationResult(req);
        
        // if (!listaErros.isEmpty()) {
        //     return res.render('perfil-editar', {
        //         titulo: 'Editar | Erro',
        //         usuarioPagina: req.session.usuario,
        //         erros: listaErros.errors ,
        //     });
        // } else {
        //     const usuarioUpdate = await Usuario.findByPk(id);
    
        //     usuarioUpdate.resumo = novoResumo;
        //     await usuarioUpdate.save();
    
        //     return res.redirect(`/index/perfil/${id}`);
        // }
    }

};

module.exports = UsuarioController;