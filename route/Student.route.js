const express = require("express");
const controller = require("../controller/Student.controller");
const Users = require("../model/users.model");

const router = express.Router();

async function author(req, res, next) {
  const id = req.jwtDecoded._id;
  try {
    const user = await Users.findById(id);
    if (!user.isAdmin) {
      return res.send("Ban ko duoc truy cap");
    } else next();  
  } catch (err) {
    res.status(400).send(err);
  }
}

router.get("/", author, controller.index);
router.get("/search", author, controller.search);
router.get('/create', author, controller.create);
router.get("/:id", controller.view);

router.post("/create", author, controller.postCreate);
// Delete Student
router.delete("/:id", author, controller.delete);
// Update student 
router.put('/:id', controller.updateStudent);

module.exports = router;
