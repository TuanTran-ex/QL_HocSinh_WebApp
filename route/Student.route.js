const express = require('express');
const path = require('path');
const controller = require('../controller/Student.controller');
const Users = require('../model/users.model');

const router = express.Router();

async function author(req, res, next) {
  const user = req.user;
  if (!user.isAdmin) {
    return res
      .status(403)
      .sendFile(path.join(__dirname, '../public', 'html', '403_page.html'));
  } else next();
}

router.get('/', author, controller.index);
router.get('/search', author, controller.search);
router.get('/create', author, controller.create);
router.get('/:id', controller.view);

router.post('/create', author, controller.postCreate);
// Delete Student
router.delete('/:id', author, controller.delete);
// Update student
router.put('/:id', controller.updateStudent);

module.exports = router;
