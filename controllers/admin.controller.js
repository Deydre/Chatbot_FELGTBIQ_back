const adminModel = require('../models/admin.model'); // Importar el modelo de la BBDD
const { createToken } = require('../config/jsonWebToken');
const { validationResult } = require("express-validator");

// Crear CRUD
//POST
const createAdmin = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        const newAdmin = req.body; // {email, password}
        const response = await adminModel.createAdmin(newAdmin);
        res.status(201).json({
            "items_created": response
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
        next(error)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Comprobar que existe antes de darle el token
        const admin = await adminModel.login(email, password);
        if (admin) {
            const token = createToken({ email: email });
            res.status(200)
                .set('Authorization', `Bearer ${token}`)
                .cookie('access_token', token)
                .json({ msg: "Admin logged" })
        } else {
            res.status(400).json({ msg: "wrong credentials" });
        }

    } catch (error) {
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
    createAdmin,
    login,
    logout,
    getAdminByEmail
}