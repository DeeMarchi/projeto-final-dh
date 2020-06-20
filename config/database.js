require('dotenv').config();

const {
    DB_USER,
    DB_PASS,
    DB_DATABASE,
    DB_HOST,
    DB_PORT,
    DB_DIALECT,
} = process.env;

module.exports = {
    username: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
};
