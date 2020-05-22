const {
    check,
    validationResult,
    body
} = require('express-validator');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const { Usuario } = require('../models');

const CAMPO_NOME = 'nome';
const CAMPO_APELIDO = 'apelido';
const CAMPO_EMAIL = 'email';
const CAMPO_SENHA = 'senha';
const CAMPO_CONFIRMA_SENHA = 'confirmaSenha';

/* Proíbe simbolos usados em tags html para evitar XSS persistente ao mostrar o apelido */
const CHARS_PROIBIDOS_REGEX = `[<>/\(\)'";]`;

/* Este regex captura espaços letras e mais os caractéres unicode latinos */
const ESPACOS_E_ALPHA_REGEX = '^[a-zA-Z\u00c0-\u00ff ]*$';

/**
 * Trata uma string com excesso de espaços
 * 
 * @param { String } string A string a ser tratada
 * @returns Uma string com os espaços normalizados
 * 
 * @example
 *  EX: 'Nome                Teste'
 *      retorna 'Nome Teste'
 */
const tratarEspacosString = string => {
    return string.split(/\s+/).join(' ');
};

const compararSenhas = (senha, { req }) => {
    if (senha !== req.body.confirmaSenha) {
        return Promise.reject('As senhas não são iguais!');
    }
    return Promise.resolve();
};

const verificarUsuarioExiste = async (_, { req }) => {
    const usuarioBusca = req.body;

    const resultado = await Usuario.findOne({
        where: {
            [Op.or]: [
                { nome: usuarioBusca.nome},
                { apelido: usuarioBusca.apelido},
                { email: usuarioBusca.email},
            ],
        },
    });

    if (resultado) {
        return Promise.reject('Um usuário com alguns destes dados já existe!');
    }
    return Promise.resolve();
};

const AuthController = {

    auth: (req, res) => {
        res.render('login', {
            titulo: 'Login',
        });
    },

    logar: async (req, res) => {
        const { email, senha } = req.body;
        const errors = [];

        const usuario = await Usuario.findOne({
            where: {
                email: email,
            },
        });

        if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
            errors.push({ msg: 'Usuário não existe, ou senha errada!'});

            return res.render('login', {
                titulo: 'Login | Erro',
                erros: errors,
            });
        }
        req.session.usuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            apelido: usuario.apelido,
            imagem_url: usuario.imagem_url,
        }

        return res.redirect('/index');
    },

    cadastro: (req, res) => {
        res.render('cadastro', {
            titulo: 'Cadastrar',
        });
    },

    validacoes: [
        check(CAMPO_NOME)
            .trim(' ')
            .customSanitizer(tratarEspacosString)
            .isLength({ min: 2 })
            .withMessage(`O ${CAMPO_NOME} precisa ter no mínimo 2 caractéres!`)
            .bail()
            .isLength({ max: 200 })
            .withMessage(`O ${CAMPO_NOME} pode ter no máximo 200 caractéres`)
            .bail()
            .matches(ESPACOS_E_ALPHA_REGEX)
            .withMessage(`O ${CAMPO_NOME} pode conter apenas letras`),
        check(CAMPO_APELIDO)
            .trim(' ')
            .customSanitizer(tratarEspacosString)
            .isLength({ min: 2 })
            .withMessage(`O ${CAMPO_APELIDO} precisa ter no mínimo 2 caractéres!`)
            .bail()
            .isLength({ max: 35 })
            .withMessage(`O ${CAMPO_APELIDO} pode ter no máximo 35 caractéres`)
            .bail()
            .not().matches(CHARS_PROIBIDOS_REGEX)
            .withMessage(`O ${CAMPO_APELIDO} contém alguns caractéres proibídos!`),
        check(CAMPO_EMAIL)
            .trim(' ')
            .isEmail()
            .withMessage(`O ${CAMPO_EMAIL} precisa ser válido!`),
        check([CAMPO_SENHA, CAMPO_CONFIRMA_SENHA])
            .trim(' ')
            .isLength({ min: 8 })
            .withMessage(`A ${CAMPO_SENHA} precisa ter no mínimo 8 caractéres!`)
            .bail()
            .isLength({ max: 40 })
            .withMessage(`A ${CAMPO_SENHA} pode ter no máximo 40 caractéres`),
        check(CAMPO_SENHA)
            .custom(compararSenhas),
        body()
            .custom(verificarUsuarioExiste),
    ],

    cadastrar: async (req, res) => {
        const listaErros = validationResult(req);

        if (!listaErros.isEmpty()) {
            return res.render('cadastro', {
                titulo: 'Cadastrar | Erro', 
                erros: listaErros.errors ,
            });
        } else {
            const { 
                nome, 
                apelido, 
                email, 
                senha 
            } = req.body;
            const senhaCripto = bcrypt.hashSync(senha, 10);

            const novoUsuario = await Usuario.create({
                nome: nome,
                apelido: apelido,
                email: email,
                senha: senhaCripto,
            });
            req.session.usuario = {
                id: novoUsuario.id,
                nome: novoUsuario.nome,
                email: novoUsuario.email,
                apelido: novoUsuario.apelido,
                imagem_url: usuario.imagem_url,
            }

            return res.redirect('/index');
        }
    },
};

module.exports = AuthController;
