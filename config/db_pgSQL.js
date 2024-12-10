require('dotenv').config();
// const pg = require('pg');
// const { Pool } = pg;
//local
// let localPoolConfig = {
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_DATABASE,
// };

    // user: process.env.DB_USER_AWS,
    // password: process.env.DB_PASSWORD_AWS,
    // host: process.env.DB_HOST_AWS,
    // port: process.env.DB_PORT_AWS,
    // database: process.env.DB_DATABASE_AWS,
    // ssl: true



// module.exports = pool;

const { Pool } = require('pg'); 

// configuramos la conexión
const pool = new Pool({
    user: process.env.DB_USER_AWS,
    password: process.env.DB_PASSWORD_AWS,
    host: process.env.DB_HOST_AWS,
    port: process.env.DB_PORT_AWS,
    database: process.env.DB_DATABASE_AWS,
    // ssl: true
    ssl: {
        rejectUnauthorized: false // Permite conexiones a certificados no verificados
    },
});

module.exports = pool;