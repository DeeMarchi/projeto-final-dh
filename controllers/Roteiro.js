const {
    Estilo,
    Moeda,
    Roteiro,
    Dia,
    Local
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
            relato,
            locais,
            selectMoeda
        } = req.body

        let roteiro = await Roteiro.create({
            usuario_id: req.session.usuario.id,
            estilo_id: selectEstilodaViagem,
            titulo: nomeRoteiro,
            data_inicio: moment().format(dataViagem),
            data_criacao: moment().format('YYYY-MM-DD'),
            qntd_dias: qnt,
            descricao: desc
        });

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

        





    }

};

module.exports = roteiroController;