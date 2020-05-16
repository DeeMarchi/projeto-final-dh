const IndexController = {

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

    home: (req, res) => {
        res.render('home', {
            titulo: 'Home',
        });
    },

};

module.exports = IndexController;
