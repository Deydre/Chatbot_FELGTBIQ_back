const pool = require('../config/db_pgSQL');
const queries = require('../utils/adminQueries') // Queries SQL
const bcrypt = require('bcryptjs');


// POST 

const login = async (email, password) => {
    let client;
    client = await pool.connect();
    try {
        // Buscar el usuario por email
        const result = await client.query(queries.checkLogin, [email]);

        if (result.rowCount === 0) {
            return null;
        }

        const admin = result.rows[0];

        // Comparar contraseñas
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return null;
        }

        return admin;
    } catch (error) {
        console.error("Error en el modelo login:", error.message);
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