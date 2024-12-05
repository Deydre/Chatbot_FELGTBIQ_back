
const { body } = require("express-validator");

// Validación de express validator
const userDataValidateChainMethod = [ // -- ARRAY DE VALIDACIONES, EN CADA POSICIÓN HAY UNA VALIDACIÓN
  body("email")
    .exists()
    .isEmail()
    .withMessage("Provide valid email"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number")
];

module.exports = {
  userDataValidateChainMethod
};
