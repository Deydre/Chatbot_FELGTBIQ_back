const pool = require('../config/db_pgSQL');
const queries = require('../utils/adminQueries') // Queries SQL
const bcrypt = require('bcryptjs');


// POST (CREATE)
const createUser = async (user) => {
    const { email, password } = user;
    let client, result;

    try {
        client = await pool.connect(); // Espera a abrir conexion
        console.log("Conexión a la base de datos establecida.");
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null; // Si hay contraseña, la hasheamos
        const data = await client.query(queries.createUser, [email, hashedPassword])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// POST 
const login = async (email, password) => {
    let client;
    client = await pool.connect();
    try {
        // Buscar el usuario por email
        const result = await client.query(queries.checkLogin, [email, password]);
        console.log()
        if (result.rowCount === 0) {
            return null;
        }

        const admin = result.rows[0];

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
    createUser,
    login,
    getAdminByEmail
}

module.exports = Admin;