const express = require('express');
const Users = require('../model/users.model');

const controller = require('../controller/Class.controller');

const router = express.Router();

router.use(async (req, res, next) => {
  const id = req.jwtDecoded._id;
  const user = await Users.findById(id);
  if (!user.isAdmin) {
    return res.send("Ban ko duoc truy cap");
  }
  else next();
});

router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/create', controller.create);
router.get('/:id', controller.view);

router.post('/create', controller.postCreate);
router.put('/:id', controller.updateClass);
router.delete('/:id', controller.delete);
module.exports = router;