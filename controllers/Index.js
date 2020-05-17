const IndexController = {

    home: (req, res) => {
        res.render('home', {
            titulo: 'Home',
        });
    },

};

module.exports = IndexController;
