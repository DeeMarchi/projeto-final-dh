const {
    Estilo,
    Moeda,
    Roteiro,
    Dia,
    Local,
    ImagemRoteiro,
    Comentario,
    Usuario,
    CurtidaComentario
} = require('../models')

const { Op } = require('sequelize');
const moment = require('moment')
const roteiroController = {

    criaRoteiro: async (req, res) => {
        let {
            selectEstilodaViagem,
            nomeRoteiro,
            dataViagem,
            qnt,
            relato,
            locais,
            selectMoeda
        } = req.body
        estilos = await Estilo.findAll({
            raw: true
        });
        moedas = await Moeda.findAll({
            raw: true
        })

        console.log(req.body)
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
        } = req.body

        let {
            files
        } = req

        // console.log(files)





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
                })

            });
        }





        for (let i = 1; i <= qnt; i++) {

            let dia = await Dia.create({
                resumo: req.body['relato' + i],
                gasto: req.body['valor' + i],
                moeda_id: req.body['selectMoeda' + i],
                roteiro_id: roteiro.id
            })

            localSeparado = req.body['locais' + i].split(",");

            localSeparado.forEach(async element => {
                await Local.create({
                    nome: element,
                    dia_id: dia.dataValues.id
                })

            });


        }
        res.redirect(`/index/roteiro/${roteiro.id}`)
        

    },
    showRoteiro: async (req, res) => {
        let idRoteiro = req.params.id

        let 
            dataValues
         = await Roteiro.findAll({
            where: {
                id: idRoteiro
            },

            include: [{
                    model: Dia,
                    as: 'dia',
                    required: true,

                    include: [{
                        model: Local,
                        as: 'local',
                        required: true,

                    }]
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
                        
                        }
                    ]
                    
                },
                {
                    model: ImagemRoteiro,
                    as: 'imagens',
                }

            ]
        });


         res.render('ver-roteiro', {
            titulo: `Roteiro ${dataValues[0].dataValues}`,
            roteiro: dataValues[0].dataValues,
            moment: moment
        }); 
        console.log(dataValues[0].dataValues)





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