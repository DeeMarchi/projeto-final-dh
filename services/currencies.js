const axios = require('axios').default;

const api = axios.create({
    baseURL: 'https://openexchangerates.org/api/',
    timeout: 5000,
});

module.exports = api;
