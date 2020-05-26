const perfilEditarProtecao = (req, res, next) => {

    /* Este middleware redireciona o usuario que está tentando editar um perfil
        para sua própria página de perfil para impedir o usuário de editar qualquer
        perfil apenas por URL */

    if (res.statusCode === 200) {
        const { id } = req.session.usuario;
        const { idPerfil } = res.locals;

        if (id !== idPerfil) {
            return res.redirect(`/index/perfil/${id}/editar`);
        }
    }

    next();
};

module.exports = perfilEditarProtecao;