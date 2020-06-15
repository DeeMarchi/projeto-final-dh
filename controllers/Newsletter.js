const { Newsletter } = require('../models');

const {
    check,
    validationResult,
    body
} = require('express-validator');

const NewsletterController = {

    valicadoes: [
        check('email')
            .trim(' ')
            .isEmail()
            .withMessage('O Email precisa ser válido!')
    ],

    cadastrar: async (req, res) => {
        const { email } = req.body;
        const listaErros = validationResult(req);

        if (!listaErros.isEmpty()) {
            return res.status(400).send(listaErros.errors[0].msg);
        }

        try {
            const emailExistente = await Newsletter.findOne({
                where: {
                    email: email,
                },
            });

            if (emailExistente) {
                return res.status(400).send('Este email já está cadastrado no nosso newsletter!');
            }
            await Newsletter.create({
                email: email,
            });

            return res.status(201).send('Email cadastrado com sucesso!');
        } catch (erro) {
            console.log(erro.msg);
        }
        
        /* Caso algum erro acima ocorra */
        res.status(500).send('Ocorreu um erro no servidor');
    },
};

module.exports = NewsletterController;
