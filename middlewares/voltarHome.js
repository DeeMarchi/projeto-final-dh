const voltarHome = (req, res, next) => {
    if (typeof(req.session.usuario) !== "undefined") {
        return res.redirect('/index');
    } else {
        next();
    }
};

module.exports = voltarHome