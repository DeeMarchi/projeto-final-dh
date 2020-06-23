const { Usuario, Roteiro, Curtida } = require('../models');
const { Op } = require('sequelize');

const {
    check,
    validationResult,
    body
} = require('express-validator');

const path = require('path');

const CAMPO_NOVO_RESUMO = 'novoResumo';
const CAMPO_NOVO_AVATAR = 'novoAvatar';

/* Proíbe simbolos usados em tags html para evitar XSS persistente ao mostrar o resumo */
const CHARS_PROIBIDOS_REGEX = `[<>/\(\)'";]`;

const UsuarioController = {

    perfil: async (req, res, next) => {
        const {
            idPerfil
        } = res.locals;

        console.log(idPerfil);

        if (res.statusCode === 200) {
            const usuario = await Usuario.findByPk(idPerfil, {
                include: [{
                    model: Roteiro,
                    as: 'roteiro',
                    where: {
                        ativo: true,
                    },
                    required: false,
                }, {
                    model: Curtida,
                    as: 'curtida',
                    include: {
                        model: Roteiro,
                        as: 'roteiro',
                        where: {
                            ativo: true,
                        },
                        required: true,
                    },
                }, ],
            });
            const usuarioRoteiros = usuario.roteiro;

            if (usuario) {
                return res.render('perfil', {
                    titulo: 'Perfil',
                    usuarioPagina: usuario,
                    usuarioRoteiros,
                    usuarioCurtidos: usuario.curtida,
                });
            }
        }
        next();
    },

    buscar: async (req, res, next) => {
        const {
            usuariosCheck,
            nomesParaBuscar
        } = req.body;
        const listaNomes = nomesParaBuscar.split(' ');
        let usuarios;

        if (nomesParaBuscar && usuariosCheck) {
            /* A linha abaixo basicamente serve como um 'OR' com todas as palavras recebidas como parâmetro */
            const nomesRegex = listaNomes.join('|');

            try {
                usuarios = await Usuario.findAll({
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
            }
            catch (erro) {
                console.log(erro.msg);
                return res.status(500).send('Ocorreu um erro no servidor');
            }
        }
        else {
            usuarios = [];
        }

        res.locals.usuariosBusca = usuarios;
        next();
    },

    editar: async (req, res, next) => {
        const {
            idPerfil
        } = res.locals;

        if (res.statusCode === 200) {
            const usuario = await Usuario.findByPk(idPerfil);
            const usuarioRoteiros = await Roteiro.findAll({
                where: {
                    usuario_id: idPerfil,
                    ativo: true,
                },
            });

            if (usuario) {
                return res.render('perfil-editar', {
                    titulo: 'Perfil - Editar',
                    usuarioPagina: usuario,
                    usuarioRoteiros,
                });
            }
        }
        next();
    },

    valicadoes: [
        check(CAMPO_NOVO_RESUMO)
        .isLength({
            max: 2000
        })
        .withMessage(`o campo ${CAMPO_NOVO_RESUMO} não pode conter mais que 2000 caractéres`)
        .bail()
        .not().matches(CHARS_PROIBIDOS_REGEX)
        .withMessage(`o campo ${CAMPO_NOVO_RESUMO} contém caractéres proibídos!`),
    ],

    atualizar: async (req, res) => {
        const {
            id
        } = req.session.usuario;
        let pathEstatico;

        /* pega o path estático /avatar/usuarioID.png sem dependência de plataforma (path.sep) */
        if (req.file) {
            pathEstatico = req.file.path.substr(req.file.path.indexOf(path.sep));
        }
        const {
            novoResumo
        } = req.body;

        const listaErros = validationResult(req);

        if (req.fileValidationError) {
            listaErros.errors.push({
                msg: req.fileValidationError,
            });
        }
        if (!listaErros.isEmpty()) {
            return res.render('perfil-editar', {
                titulo: 'Editar | Erro',
                usuarioPagina: req.session.usuario,
                erros: listaErros.errors,
            });
        }
        else {
            const usuarioUpdate = await Usuario.findByPk(id);

            if (pathEstatico) {
                usuarioUpdate.imagem_url = pathEstatico;
            }
            usuarioUpdate.resumo = novoResumo;
            await usuarioUpdate.save();

            return res.redirect(`/index/perfil/${id}`);
        }
    }
};

module.exports = UsuarioController;