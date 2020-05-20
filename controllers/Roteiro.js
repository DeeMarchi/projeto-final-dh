const {Estilo,Moeda}=require('../models')
const roteiroController = {

    criaRoteiro: async (req, res) => {
        let {selectEstilodaViagem,nomeRoteiro,dataViagem,qnt,relato,locais,selectMoeda}=req.body
        estilos = await Estilo.findAll({ raw: true });
            moedas =await Moeda.findAll({raw: true })
            
        console.log(req.body)
        res.render('criar-roteiro', {
            titulo: 'Criar Roteiro',
            estilosViagem: estilos,
            moedaViagem:moedas
        });
    },

};

module.exports = roteiroController;