const Sequelize = require('sequelize');
const { Op } = Sequelize;

const {
    Comentario,
    Curtida,
    CurtidaComentario,
    Dia,
    Estilo,
    ImagemRoteiro,
    Local,
    Moeda,
    Roteiro,
    Usuario,
} = require('./models');

const testarQueries = async () => {
    const resultadoQuery = await Promise.all([
        Comentario.findAll(),
        Curtida.findAll(),
        CurtidaComentario.findAll(),
        Dia.findAll(),
        Estilo.findAll(),
        ImagemRoteiro.findAll(),
        Local.findAll(),
        Moeda.findAll(),
        Roteiro.findAll(),
        Usuario.findAll(),
    ]);
};

const testarUsuarioRoteiro = async () => {
    console.log('\n\nRelações Usuário | Roteiro\n\n');

    const resultado = await Usuario.findByPk(0, {
        include: {
            model: Roteiro,
            required: true,
            as: 'roteiro',
        },
    });
    console.log('\n\n');
};

const testarRelacoes = () => {
    testarUsuarioRoteiro();
};

testarQueries()
    .then(testarRelacoes);
