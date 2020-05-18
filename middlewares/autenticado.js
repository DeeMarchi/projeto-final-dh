const autenticado = (req, res, next) => {
    if (typeof(req.session.usuario) !== "undefined") {
        next();
    } else {
        return res.redirect('/');
    }
};

module.exports = autenticado;
