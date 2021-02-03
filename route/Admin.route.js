const express = require('express');
const path = require('path');
const router = express.Router();

const Users = require('../model/users.model');
const controller = require('../controller/Admin.controller');

router.use(async (req, res, next) => {
  const user = req.user;
  if (!user.isAdmin) {
    return res
      .status(403)
      .sendFile(path.join(__dirname, '../public', 'html', '403_page.html'));
  } else next();
});

router.get('/', controller.index);

module.exports = router;
