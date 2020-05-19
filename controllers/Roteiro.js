const roteiroController = {

    criaRoteiro: (req, res) => {
        res.render('criar-roteiro', {
            titulo: 'Criar Roteiro',
        });
    },

};

module.exports = roteiroController;