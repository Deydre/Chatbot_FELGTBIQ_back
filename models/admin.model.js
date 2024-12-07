const pool = require('../config/db_pgSQL');
const queries = require('../utils/adminQueries') // Queries SQL
const bcrypt = require('bcryptjs');


// POST 

const login = async (email, password) => {
    let client;
    client = await pool.connect();
    try {
        // Verifica si admin existe
        const result = await client.query(queries.checkLogin, [email, password]);

        // Si no se encuentra admin, devuelve null
        if (result.rowCount === 0) {
            return null;
        }

        // Si se encuentra admin, devuelve el primer resultado
        return result.rows[0];
    } catch (error) {
        console.log(error.message);
        throw error;
    } finally {
        client.release();
    }
};


// GET BY EMAIL (CONTROLLER PARAMS)
const getAdminByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAdminByEmail, [email])
        result = data

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const Admin = {
    login,
    getAdminByEmail
}

module.exports = Admin;