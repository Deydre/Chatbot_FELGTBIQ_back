const express = require('express');
const getAccessToken = require('../middlewares/getAccessToken');
const decodeToken = require('../middlewares/decodeToken');


const adminController = require("../controllers/admin.controller");
const router = express.Router();
const {userDataValidateChainMethod} = require('../validation/admin.validation');

// Poner rutas
router.post('/login', userDataValidateChainMethod, adminController.login);
// router.post('/login', adminController.login);

router.get('/logout', adminController.logout);
router.get('/me', getAccessToken, decodeToken, adminController.getAdminByEmail);
// router.get('/me', adminController.getAdminByEmail);


module.exports = router;
