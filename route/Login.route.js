const express = require('express');

const controller = require('../controller/Login.controller');

const router = express.Router();

router.get('/', controller.index);

// Login & logout
router.post('/login', controller.login);
router.get('/logout', controller.logout);

// Register
// router.get('/register', controller.registerPage);
// router.post('/', controller.register);

// Register admin
router.post('/admin', controller.adminRegister);

// Forgot Password
router.get('/forgotpass', controller.forgotPassPage);
router.post('/forgotpass', controller.forgotPass);

module.exports = router;
