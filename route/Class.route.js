const express = require('express');
const passport = require('../middlewares/passport');
const path = require('path');

const Users = require('../model/users.model');

const controller = require('../controller/Class.controller');

const router = express.Router();

router.use(async (req, res, next) => {
  const user = req.user;
  if (!user.isAdmin) {
    return res
      .status(403)
      .sendFile(path.join(__dirname, '../public', 'html', '403_page.html'));
  } else next();
});

router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/create', controller.create);
router.get('/:id', controller.view);

router.post('/create', controller.postCreate);
router.put('/:id', controller.updateClass);
router.delete('/:id', controller.delete);
module.exports = router;
