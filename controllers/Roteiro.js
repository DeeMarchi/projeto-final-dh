const {
    Estilo,
    Moeda,
    Roteiro,
    Dia,
    Local,
    ImagemRoteiro,
    Comentario,
    Usuario,
    CurtidaComentario,
} = require('../models')

const { Op } = require('sequelize');
const moment = require('moment')
const roteiroController = {

    criaRoteiro: async (req, res) => {
        estilos = await Estilo.findAll();
        moedas = await Moeda.findAll();

        res.render('criar-roteiro', {
            titulo: 'Criar Roteiro',
            estilosViagem: estilos,
            moedaViagem: moedas
        });
    },

    criarRoteiro: async (req, res) => {
        let {
            selectEstilodaViagem,
            nomeRoteiro,
            dataViagem,
            qnt,
            desc,
        } = req.body;

        let {
            files
        } = req;

        let roteiro = await Roteiro.create({
            usuario_id: req.session.usuario.id,
            estilo_id: selectEstilodaViagem,
            titulo: nomeRoteiro,
            data_inicio: moment().format(dataViagem),
            data_criacao: moment().format('YYYY-MM-DD'),
            qntd_dias: qnt,
            descricao: desc
        });

        if (files.length > 0) {
            files.forEach(async file => {
                await ImagemRoteiro.create({
                    roteiro_id: roteiro.id,
                    url: file.filename
                });
            });
        }
        for (let i = 1; i <= qnt; i++) {
            let dia = await Dia.create({
                resumo: req.body['relato' + i],
                gasto: req.body['valor' + i],
                moeda_id: req.body['selectMoeda' + i],
                roteiro_id: roteiro.id
            });

            localSeparado = req.body['locais' + i].split(",");
            localSeparado.forEach(async element => {
                await Local.create({
                    nome: element,
                    dia_id: dia.dataValues.id
                });
            });
        }
        res.redirect(`/index/roteiro/${roteiro.id}`);
    },

    showRoteiro: async (req, res, next) => {
        const idRoteiro = req.params.id;

        try {
            const roteiro = await Roteiro.findOne({
                where: {
                    id: idRoteiro,
                    ativo: true,
                },
                include: [
                    {
                        model: Dia,
                        as: 'dia',
                        required: true,
                        include: [{
                            model: Local,
                            as: 'local',
                            required: true,
                        },
                        {
                            model: Moeda,
                            as: 'moeda',
                            required: true,
                        }],
                    },
                    {
                        model: Usuario,
                        as: 'usuario',
                        required: true,
                    },
                    {
                        model: Estilo,
                        as: 'estilo',
                        required: true,
                    },
                    {
                        model: Comentario,
                        as: 'comentario',
                        include: [{
                            model: Usuario,
                            as: 'usuario',
                        },
                            {
                                model: CurtidaComentario,
                                as: 'curtidas',
                            },
                        ],
                    },
                    {
                        model: ImagemRoteiro,
                        as: 'imagens',
                    },
                ],
            });
            if (!roteiro) {
                res.status(404);
                return next();
            }
           
            
            res.render('ver-roteiro', {
                titulo: `Roteiro ${roteiro.titulo}`,
                roteiro: roteiro,
                moment: moment
            });
        } catch (erro) {
            console.log(erro.msg);
            return res.status(500).send('Erro no servidor');
        }
    },

    exluirRoteiro: async (req, res, next) => {
        const { usuario } = req.session;
        const { idRoteiro } = res.locals;

        if (res.statusCode !== 200) {
            return next();
        }

        try {
            const roteiro = await Roteiro.findOne({
                where: {
                    id: idRoteiro,
                    usuario_id: usuario.id,
                },
            });
            if (!roteiro) {
                return res.status(403).send('Ação não permitida!');
            }
            roteiro.ativo = false;
            await roteiro.save();
        } catch (erro) {
            console.log(erro.msg);
            return res.status(500).send('Ocorreu um erro no servidor!');
        }
        
        return res.redirect(`/index/perfil/${usuario.id}/editar`);
    },

    buscarRoteiros: async (req, res, next) => {
        console.log(req.body);
        const { roteirosCheck, roteirosParaBuscar } = req.body;
        const listaRoteiros = roteirosParaBuscar.split(' ');
        let roteiros;

        if (roteirosParaBuscar && roteirosCheck) {
            /* A linha abaixo basicamente serve como um 'OR' com todas as palavras recebidas como parâmetro */
            const nomesRegex = listaRoteiros.join('|');

            try {
                roteiros = await Roteiro.findAll({
                    where: {
                        titulo: {
                            [Op.regexp]: nomesRegex,
                        },
                        ativo: true,
                    },
                });
            } catch (erro) {
                console.log(erro.msg);
                return res.status(500).send('Ocorreu um erro no servidor');
            }
        } else {
            roteiros = [];
        }

        res.locals.roteiros = roteiros;
        next();
    },
};

module.exports = roteiroController;