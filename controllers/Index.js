const IndexController = {

    index: (req, res) => {
        res.render('cadastro', { titulo: 'Cadastro' });
    },

};

module.exports = IndexController;
