const IndexController = {

    home: (req, res) => {
        res.render('home', {
            titulo: 'Home',
        });
    },

    sobre: (req, res) => {
        res.render('sobre', {
            titulo: 'Sobre',
        });
    },

    pesquisa: (req, res) => {
        res.render('Pesquisa', {
            titulo: 'Pesquisa',
        });
    },

};

module.exports = IndexController;
