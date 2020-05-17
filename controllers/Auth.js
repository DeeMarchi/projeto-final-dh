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

    cadastrar: (req, res) => {
        console.log(req.body);
    },

};

module.exports = AuthController;
