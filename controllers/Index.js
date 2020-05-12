const IndexController = {

    index: (req, res) => {
        res.render('perfil', { titulo: 'Cadastro' });
    },

};

module.exports = IndexController;
