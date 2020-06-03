const { Roteiro, Usuario } = require('../models');

const IndexController = {

    home: async (req, res) => {
        const roteiros = await Roteiro.findAll({
            include: {
                model: Usuario,
                as: 'usuario',
                required: true,
            }
        });

        console.log(roteiros);
        

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
