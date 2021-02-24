const express = require('express');
const controller = require('../controller/Class.controller');
const permit = require('../middlewares/Authorization');

const router = express.Router();


router.get('/', permit('admin'), controller.index);
router.get('/search', permit('admin'), controller.search);
router.get('/create', permit('admin'), controller.create);
router.get('/:id', permit('student', 'admin', 'teacher'), controller.view);

router.post('/create', permit('admin'), controller.postCreate);
router.put('/:id', permit('admin'), controller.updateClass);
router.delete('/:id', permit('admin'), controller.delete);
module.exports = router;
