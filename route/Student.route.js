const express = require('express');
const controller = require('../controller/Student.controller');
const permit = require('../middlewares/Authorization');

const router = express.Router();

router.get('/', permit('admin'), controller.index);
router.get('/search', permit('admin'), controller.search);
router.get('/create', permit('admin'), controller.create);
router.get('/:id', permit('student', 'admin'), controller.view);

router.post('/create', permit('admin'), controller.postCreate);
// Delete Student
router.delete('/:id', permit('admin'), controller.delete);
// Update student
router.put('/:id', permit('student', 'admin'), controller.updateStudent);

module.exports = router;
