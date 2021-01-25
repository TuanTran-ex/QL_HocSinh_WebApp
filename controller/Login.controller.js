const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../model/users.model");
const Student = require("../model/student.model");
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/Validation");

module.exports.index = (req, res) => {
  res.render("validate/login.pug");
};

module.exports.registerPage = (req, res) => {
  res.render("validate/register.pug");
};

// Login
module.exports.login = async (req, res) => {
  // Validation data from client
  const { error } = loginValidation(req.body);
  if (error)
    return res.status(400).json({
      code: 400,
      message: error.details[0].message,
    });

  const { username, password } = req.body;
  const user = await Users.findOne({ username: username });
  if (!user)
    res.status(404).json({
      code: 404,
      message: "Not found user",
    });
  else {
    const truePass = await bcrypt.compare(password, user.password);
    if (!truePass) {
      res.status(400).json({
        code: 400,
        message: "Wrong password",
      });
    } else {
      try {
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_KEY);
        if (user.isAdmin) {
          res
            .cookie("auth-token", token, { maxAge: 240000 })
            .redirect("/admin");
        } else {
          res
            .cookie("auth-token", token, { maxAge: 240000 })
            .redirect(`/users/${user._id}`);
        }
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: "Can not create token",
          error: err,
        });
      }
    }
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("auth-token").redirect("/auth");
};

// Register
module.exports.register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { username, password, studentID } = req.body;

  const user = await Users.findOne({ username: username });
  if (user) {
    return res.status(400).json({
      code: 400,
      message: "Username already exist",
    });
  }
  const student = await Student.findById(studentID);
  if (!student) {
    return res.status(404).json({
      code: 404,
      message: "Student not fault",
    });
  }
  try {
    // Create new user
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(password, saltRounds);
    const newUser = new Users({
      username: username,
      password: hashPass,
      studentID: studentID,
    });
    await newUser.save();
    res.redirect("/auth");
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: "Can not create new account. Syntax error",
      error: err,
    });
  }
};

// Register admin
module.exports.adminRegister = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { username, password } = req.body;

  const user = await Users.findOne({ username: username });
  if (user) {
    return res.status(400).json({
      code: 400,
      message: "User already exist",
    });
  }
  try {
    // Create new user
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(password, saltRounds);
    const newUser = new Users({
      username: username,
      password: hashPass,
      studentID: null,
      isAdmin: true,
    });
    await newUser.save();
    res.send("Register success");
    res.redirect("/auth");
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: "Can not create new account. Syntax error",
      error: err,
    });
  }
};

// Forgot Password
module.exports.forgotPassPage = (req, res) => {
  res.render("validate/forgotPass");
};

module.exports.forgotPass = async (req, res) => {
  const { username, newpass } = req.body;
  const user = await Users.findOne({ username: username });
  if (!user) {
    res.status(404).json({
      code: 404,
      message: "User not found!",
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
        message: "Bad request. Password wrong or can not Update",
      });
    }
  }
};
