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
    await Promise.all([
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

const testarRelacao = async (model, includeModel, alias = includeModel.name.toLocaleLowerCase()) => {
    console.log(`\n\nRelações ${includeModel.name} | ${model.name}\n\n`);

    await model.findAll({
        include: {
            model: includeModel,
            required: true,
            as: alias,
        }
    });
};

const testesRelacoes = async () => {
    await testarRelacao(Roteiro, Usuario);
    await testarRelacao(Roteiro, Estilo);
    await testarRelacao(Roteiro, Dia);
    await testarRelacao(Roteiro, Curtida);
    await testarRelacao(Usuario, Curtida);
};

testarQueries()
    .then(testesRelacoes);
