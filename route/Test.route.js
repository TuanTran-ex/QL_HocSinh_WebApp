const router = require("express").Router();
const User = require("../model/users.model");
const Student = require("../model/student.model");

router.get("/", (req, res) => {
  res.send("test");
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findById(id);
    if (!student) {
      res.status(404).json({
        code: 404,
        reason: 'Not found',
        devMessage: 'Student not found',
        message: 'The resource you are looking for has been removed or is temporarily unavailable'
      })
    } else {
      res.status(200).send(student);
    }
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: 'Can not find student',
    });
  }
});

router.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    res.status(404).json({
      code: 404,
      message: 'User not found'
    });
  } else {
    try {
      const saltRounds = 10;
      const hashPass = await bcrypt.hash(newpass, saltRounds);
      user.password = hashPass;
      await user.save();
      res.redirect("/auth");
    } catch (err) {
      res.status(400).json({
        code: 400,
        message: 'Wrong Password'
      });
    }
  }
});

module.exports = router;
