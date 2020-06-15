const {
    Estilo,
    Moeda,
    Roteiro,
    Dia,
    Local,
    ImagemRoteiro,
    Comentario,
    Usuario
} = require('../models')
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


    },
    showRoteiro: async (req, res) => {
        let idRoteiro = req.params.id

        let {
            dataValues
        } = await Roteiro.findOne({
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
                    required: true,
                    include: [{
                        model: Usuario,
                        as: 'usuario',
                        required: true,

                    }]

                },
                {
                    model: ImagemRoteiro,
                    as: 'imagens',
                }

            ]
        });


        res.render('ver-roteiro', {
            titulo: `Roteiro ${dataValues.titulo}`,
            roteiro: dataValues,
            moment: moment
        });
        console.log(dataValues)





    }

};

module.exports = roteiroController;