const IndexController = {

    index: (req, res) => {
        res.render('criar-roteiro', { titulo: 'Cadastro' });
    },

};

module.exports = IndexController;
