const IndexController = {

    index: (req, res) => {
        res.render('sobre', { titulo: 'Cadastro' });
    },

};

module.exports = IndexController;
