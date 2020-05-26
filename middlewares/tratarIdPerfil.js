const tratarIdPerfil = (req, res, next) => {
    let { id } = req.params;
    id = Number(id);

    if (!Number.isInteger(id)) {
        res.status(404);
    } else {
        res.locals.idPerfil = id;
    }
    next();
}

module.exports = tratarIdPerfil;