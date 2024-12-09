require('dotenv').config();
const pg = require('pg');
const { Pool } = pg;
//local
// let localPoolConfig = {
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_DATABASE,
// };
let localPoolConfig = {
    user: process.env.DB_USER_AWS,
    password: process.env.DB_PASSWORD_AWS,
    host: process.env.DB_HOST_AWS,
    port: process.env.DB_PORT_AWS,
    database: process.env.DB_DATABASE_AWS,
    ssl: { rejectUnauthorized: false }
};

const pool = new Pool(localPoolConfig);

module.exports = pool;