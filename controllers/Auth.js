const {
    check,
    validationResult,
    body
} = require('express-validator');

const CAMPO_NOME = 'nome';
const CAMPO_APELIDO = 'apelido';
const CAMPO_EMAIL = 'email';
const CAMPO_SENHA = 'senha';
const CAMPO_CONFIRMA_SENHA = 'confirmaSenha';

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
            .isLength({ min: 2 })
            .withMessage(`O ${CAMPO_NOME} precisa ter no mínimo 2 caractéres!`)
            .bail()
            .isLength({ max: 200 })
            .withMessage(`O ${CAMPO_NOME} pode ter no máximo 200 caractéres`)
            .bail()
            .isAlpha()
            .withMessage(`O ${CAMPO_NOME} pode apenas conter letras!`),
        check(CAMPO_APELIDO)
            .isLength({ min: 2 })
            .withMessage(`O ${CAMPO_APELIDO} precisa ter no mínimo 2 caractéres!`)
            .bail()
            .isLength({ max: 35 })
            .withMessage(`O ${CAMPO_APELIDO} pode ter no máximo 35 caractéres`)
            .bail()
            .isAlphanumeric()
            .withMessage(`O ${CAMPO_APELIDO} pode ter somente letras e números!`),
        check(CAMPO_EMAIL)
            .isEmail()
            .withMessage(`O ${CAMPO_EMAIL} precisa ser válido!`),
        check([CAMPO_SENHA, CAMPO_CONFIRMA_SENHA])
            .isLength({ min: 8 })
            .withMessage(`A ${CAMPO_SENHA} precisa ter no mínimo 8 caractéres!`)
            .bail()
            .isLength({ max: 40 })
            .withMessage(`A ${CAMPO_SENHA} pode ter no máximo 40 caractéres`),
    ],

    cadastrar: (req, res) => {
        console.log(req.body);

        const listaErros = validationResult(req);

        console.log(listaErros);
        

    },

};

module.exports = AuthController;
