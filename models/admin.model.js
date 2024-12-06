const pool = require('../config/db_pgSQL');
const queries = require('../utils/adminQueries') // Queries SQL
const bcrypt = require('bcryptjs');


// POST (CREATE)
const createAdmin = async (user) => {
    const { email, password } = admin;
    let client, result;

    try {
        client = await pool.connect(); // Espera a abrir conexion
        console.log("Conexión a la base de datos establecida.");
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null; // Si hay contraseña, la hasheamos
        const data = await client.query(queries.createAdmin, [email, hashedPassword])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const login = async (email, password) => {
    let client, result;
    client = await pool.connect();
    try {
        const adminExists = await client.query(queries.checkLogin, [email, password]);
        console.log(adminExists);
        return adminExists;

    } catch (error) {
        console.log(error.message);
        throw error
    };
};

// GET BY EMAIL (CONTROLLER PARAMS)
const getAdminByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAdminByEmail, [email])
        result = data.rows

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const Admin = {
    createAdmin,
    login,
    getAdminByEmail
}

module.exports = Admin;