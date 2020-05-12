const IndexController = {

    index: (req, res) => {
        res.render('roteiro-criar', { titulo: 'Cadastro' });
    },

};

module.exports = IndexController;
