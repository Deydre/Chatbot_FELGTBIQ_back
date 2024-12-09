const fs = require('fs');
require('dotenv').config();
const { Pool } = require('pg');

// Debugging the path for the certificate
console.log('Looking for CA file at:', __dirname + '/../certs/eu-west-1-bundle.pem');

let localPoolConfig = {
    user: process.env.DB_USER_AWS,
    password: process.env.DB_PASSWORD_AWS,
    host: process.env.DB_HOST_AWS,
    port: process.env.DB_PORT_AWS,
    database: process.env.DB_DATABASE_AWS,
    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync(__dirname + '/certs/eu-west-1-bundle.pem').toString(), // Ensure this path is correct
    },
};

// Initialize the database pool
const pool = new Pool(localPoolConfig);

// Export the pool for use in other parts of the application
module.exports = pool;
