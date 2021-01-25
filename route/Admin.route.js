const express = require("express");
const router = express.Router();

const Users = require("../model/users.model");
const controller = require("../controller/Admin.controller");

router.use(async (req, res, next) => {
  const id = req.jwtDecoded._id;
  const user = await Users.findById(id);
  if (!user.isAdmin) {
    return res.status(403).json({
      code: 403,
      reason: 'Forbidden/Access Denied',
      message: 'You do not have permission to view this directory or page using the credentials that you supplied'
    });
  }
  else next();
});

router.get("/", controller.index);

module.exports = router;