const express = require('express');

const controller = require('../controller/User.controller');
const router = express.Router();

router.get('/changepass', controller.changePassPage);
router.get('/:id', controller.index);
router.put('/:id', controller.update);
router.put('/', controller.changePass);
module.exports = router;
