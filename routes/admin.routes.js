const express = require('express');
const getAccessToken = require('../middlewares/getAccessToken');
const decodeToken = require('../middlewares/decodeToken');


const adminController = require("../controllers/admin.controller");
const router = express.Router();
const {userDataValidateChainMethod} = require('../validation/admin.validation');

// Poner rutas

module.exports = router;
