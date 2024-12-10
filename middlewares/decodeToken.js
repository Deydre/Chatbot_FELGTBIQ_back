const express = require("express");
require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.MY_TOKEN_SECRET;

if (!SECRET) {
    throw new Error("MY_TOKEN_SECRET no está definido en las variables de entorno");
}

const decodeToken = express.Router();

decodeToken.use(async (req, res, next) => {
    try {
        let token;

        // Priorizar el token en el encabezado Authorization
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }
        // Si no está en el encabezado, buscar en las cookies
        else if (req.cookies && req.cookies.access_token) {
            token = req.cookies.access_token;
        }

        // Si no hay token, devolver error
        if (!token) {
            return res.status(401).json({ msg: "Token not provided." });
        }

        // Decodificar y verificar el token
        const decoded = jwt.verify(token, SECRET);
        console.log("Token decodificado:", decoded);

        // Añadir la información decodificada al objeto de solicitud
        req.token = decoded;
        next();
    } catch (err) {
        console.error("Error al verificar el token:", err.message);
        res.status(400).json({
            msg: "Token error",
            error: err.message,
        });
    }
});

module.exports = decodeToken;
