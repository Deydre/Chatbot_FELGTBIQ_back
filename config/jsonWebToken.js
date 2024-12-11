const jwt = require('jsonwebtoken');

const SECRET = process.env.MY_TOKEN_SECRET;

const createToken = (payload) => {
    if (!SECRET) {
        throw new Error("MY_TOKEN_SECRET no está definido en las variables de entorno");
    }

    return jwt.sign(payload, SECRET, { expiresIn: '1h' }); // Token expira en 1 hora
};

module.exports = { createToken };
