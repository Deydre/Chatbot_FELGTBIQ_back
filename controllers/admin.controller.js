const adminModel = require('../models/admin.model'); // Importar el modelo de la BBDD
const { createToken } = require('../config/jsonWebToken');
const { validationResult } = require("express-validator");


//POST

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica si las credenciales son correctas
        const admin = await adminModel.login(email, password);

        if (!admin) {
            return res.status(400).json({ msg: "Credenciales incorrectas" });
        }

        // Genera el token si las credenciales son correctas
        const token = createToken({ email });

        // Responder con el token en la cabecera y como cookie
        res.status(200)
            .set('Authorization', `Bearer ${token}`)
            .cookie('access_token', token)
            .json({ msg: "Admin logged in" });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: error.message });
    }
};


const logout = async (req, res) => {
    try {
        res.status(200)
            .set('Authorization', "")
            .cookie('access_token', "")
            .json({ msg: "Admin unlogged" })
    } catch (error) {
        res.status(400).json({ msg: error.message });

    }
};

const getAdminByEmail = async (req, res) => {
    const email = req.token.email;

    try {
        const adminData = await adminModel.getAdminByEmail(email);
        if (adminData && adminData.length > 0) {
            res.status(200).json(adminData);
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        console.error('Error obtaining admin by email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    login,
    logout,
    getAdminByEmail
}