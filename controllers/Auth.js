const {
    check,
    validationResult,
    body
} = require('express-validator');
const { Op } = require('sequelize');

const { Usuario } = require('../models');

const CAMPO_NOME = 'nome';
const CAMPO_APELIDO = 'apelido';
const CAMPO_EMAIL = 'email';
const CAMPO_SENHA = 'senha';
const CAMPO_CONFIRMA_SENHA = 'confirmaSenha';

const CHARS_PROIBIDOS_REGEX = `[<>/\(\)'";]`;
const ESPACOS_E_ALPHA_REGEX = '^[a-zA-Z ]*$';

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

    cadastrar: (req, res) => {
        const listaErros = validationResult(req);



    },

};

module.exports = AuthController;
