const express = require('express');
const controller = require('../controller/Teacher.controller');
const permit = require('../middlewares/Authorization');

const router = express.Router();

router.get('/', permit('admin'), controller.index);
router.get('/create', permit('admin'), controller.create);
router.get('/search', permit('admin'), controller.search);
router.get('/:id', permit('teacher', 'admin'), controller.view);

router.post('/create', permit('admin'), controller.postCreate);
// Delete Teacher
router.delete('/:id', permit('admin'), controller.delete);
// Update Teacher
router.put('/:id', permit('teacher', 'admin'), controller.updateTeacher);

module.exports = router;
