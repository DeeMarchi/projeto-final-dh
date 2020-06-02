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
    criarRoteiro: async (req, res) => {
        let {selectEstilodaViagem,nomeRoteiro,dataViagem,qnt,relato,locais,selectMoeda}=req.body
        
         for (let i = 1; i <= qnt; i++){
             console.log(req.body['relato' + i])
             console.log(req.body['locais' + i])
             console.log(req.body['selectMoeda' + i])     
        }  
        
    },

};

module.exports = roteiroController;