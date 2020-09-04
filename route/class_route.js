const express = require('express');

const controller = require('../controller/class_controller');

const router = express.Router();

router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/create', controller.create);
router.get('/:id', controller.view);

router.post('/create', controller.postCreate);

router.get('/delete/:id', controller.delete);
module.exports = router;