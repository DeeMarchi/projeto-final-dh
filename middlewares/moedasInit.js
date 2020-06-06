const currenciesAPI = require('../services/currencies');
const { Moeda } = require('../models');

const moedasInit = {

    guardarMoedasAPI: async () => {
        await currenciesAPI.get('/currencies.json')
            .then(moedas => {
                try {
                    const codigoMoedas = Object.keys(moedas.data)
                    const objetosBanco = codigoMoedas.map(codigo => {
                        return {
                            simbolo: codigo,
                            nome: moedas.data[codigo],
                        };
                    });
    
                    Moeda.bulkCreate(objetosBanco, {
                        ignoreDuplicates: true,
                    });
                } catch (erro) {
                    console.log(erro.msg);
                }
            })
            .catch(erro => {
                console.log(erro);
            });
    },

};

module.exports = moedasInit;
