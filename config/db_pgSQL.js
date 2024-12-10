const fs = require('fs');
require('dotenv').config();
const { Pool } = require('pg');

// Configuración de conexión al pool
let localPoolConfig = {
    user: process.env.DB_USER_AWS,
    password: process.env.DB_PASSWORD_AWS,
    host: process.env.DB_HOST_AWS,
    port: parseInt(process.env.DB_PORT_AWS, 10), // Asegura que sea un número
    database: process.env.DB_DATABASE_AWS,
    ssl: { rejectUnauthorized: false }
};

const pool = new Pool(localPoolConfig);

// Función para verificar la conexión
async function testConnection() {
    try {
        const result = await pool.query('SELECT 1;'); // Prueba de conexión básica
        console.log('Conexión exitosa:', result.rows);
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error.message);
    } finally {
        await pool.end(); // Cierra el pool después de la prueba
    }
}

async function fetchAdminData() {
    try {
        const query = `
            SELECT * FROM admin_data;
        `;
        const result = await pool.query(query); // Ejecuta la consulta
        console.log('Datos recuperados de admin_data:', result.rows); // Muestra los datos
    } catch (error) {
        console.error('Error al recuperar datos de admin_data:', error.message);
    }
}
fetchAdminData();


// Llama a la función de prueba
testConnection();

module.exports = pool;
