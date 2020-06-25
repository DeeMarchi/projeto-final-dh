const currenciesAPI = require('../services/currencies');
const { Moeda } = require('../models');

const moedasInit = {

    guardarMoedasAPI: async () => {
        await currenciesAPI.get('/all/USD,CAD,AUD,EUR,GBP,JPY,CHF')
            .then(moedas => {
                const codigoMoedas = Object.keys(moedas.data)
                const objetosBanco = codigoMoedas.map(codigo => {
                    return {
                        simbolo: codigo,
                        nome: moedas.data[codigo].name,
                    };
                });
                objetosBanco.push({ simbolo: 'BRL', nome: 'Real Brasileiro' });

                Moeda.bulkCreate(objetosBanco, {
                    ignoreDuplicates: true,
                });
            })
            .catch(erro => {
                console.log(erro);
            });
    },
};

module.exports = moedasInit;
