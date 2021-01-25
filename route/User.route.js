const express = require('express');

const controller = require('../controller/User.controller');
const router = express.Router();

// Get page changepass
router.get('/changepass', controller.changePassPage);
// Get profile user
router.get('/:id', controller.index);
// Update info user
router.put('/:id', controller.update);
// Change password
router.put('/', controller.changePass)
module.exports = router;