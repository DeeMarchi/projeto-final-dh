const IndexController = {

    index: (req, res) => {
        res.render('pesquisa', { titulo: 'Cadastro' });
    },

};

module.exports = IndexController;
