const axios = require('axios').default;

const api = axios.create({
    baseURL: 'https://economia.awesomeapi.com.br/json',
    timeout: 5000,
});

module.exports = api;
