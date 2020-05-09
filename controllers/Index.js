const IndexController = {

    index: (req, res) => {
        res.render('index', { titulo: 'Login' });
    },

};

module.exports = IndexController;
