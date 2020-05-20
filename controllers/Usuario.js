const UsuarioController = {

    perfil: (req, res) => {
        res.render('perfil', {
            titulo: 'Perfil'
        });
    },

};

module.exports = UsuarioController;