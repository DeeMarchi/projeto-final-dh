const IndexController = {

    index: (req, res) => {
        res.render('ver-roteiro', { titulo: 'Cadastro' });
    },

};

module.exports = IndexController;
