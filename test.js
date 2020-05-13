const {
    Comentario,
    Curtida,
    CurtidaComentario,
    Dia,
    Estilo,
    ImagemAvatar,
    ImagemRoteiro,
    Local,
    Moeda,
    Roteiro,
    Usuario,
} = require('./models');

const testarQueries = async () => {
    let resultadoQuery = await Comentario.findAll();
    resultadoQuery = await Curtida.findAll();
    resultadoQuery = await CurtidaComentario.findAll();
    resultadoQuery = await Dia.findAll();
    resultadoQuery = await Estilo.findAll();
    resultadoQuery = await ImagemAvatar.findAll();
    resultadoQuery = await ImagemRoteiro.findAll();
    resultadoQuery = await Local.findAll();
    resultadoQuery = await Moeda.findAll();
    resultadoQuery = await Roteiro.findAll();
    resultadoQuery = await Usuario.findAll();
};

testarQueries();