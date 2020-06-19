const tratarIdRoteiro = (req, res, next) => {
    let { id } = req.params;
    id = Number(id);

    if (!Number.isInteger(id)) {
        res.status(404);
    } else {
        res.locals.idRoteiro = id;
    }
    next();
}

module.exports = tratarIdRoteiro;
