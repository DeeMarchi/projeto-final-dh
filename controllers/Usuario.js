const { Usuario } = require('../models');

const UsuarioController = {

    perfil: async (req, res, next) => {
        let { id } = req.params;
        id = Number(id);

        if (Number.isInteger(id)) {
            const usuario = await Usuario.findByPk(id);

            if (usuario) {
                return res.render('perfil', {
                    titulo: 'Perfil'
                });
            }
        }
        res.status(404);
        return next();
    },

};

module.exports = UsuarioController;