const IndexController = {

    index: (req, res) => {
        res.render('login', { titulo: 'Cadastro' });
    },

};

module.exports = IndexController;
