const bcrypt = require("bcrypt");

const User = require("../model/users.model");
const Student = require("../model/student.model");
const Class = require("../model/class.model");

module.exports.index = async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      res.status(404).json({
        code: 404,
        message: "User not found",
      });
    } else {
      const student = await Student.findById(user.studentID); // Không tim thay student nen class find bi loi
      if (!student) {
        res.status(500).json({
          code: 500,
          message: "Wrong data user",
        });
      } else {
        const classItem = await Class.findOne({ _id: student.class_id });
        res.render("user/index", {
          student_item: student,
          class_name: classItem ? classItem.name : "",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: "Syntax Error",
      error: err,
    });
  }
};

module.exports.update = async (req, res) => {
  const id = req.params.id;
  const { name, phone_number, birthdate, address, class_id } = req.body;

  try {
    const user = await User.findById(id);
    const updateUser = await Student.findByIdAndUpdate(
      user.studentID,
      req.body
    );
    if (updateUser) {
      res.status(200).send(updateUser);
    } else {
      res.status(404).json({
        code: 404,
        message: "Users not found! Wrong ID",
      });
    }
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: "Bad request. Wrong syntax Student id",
      error: err,
    });
  }
};

module.exports.changePassPage = (req, res) => {
  res.render("user/changePass");
};

module.exports.changePass = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ username: username });
    if (!User) {
      res.status(404).json({
        code: 404,
        message: "User not found",
      });
    } else {
      const saltRounds = 10;
      const hashPass = await bcrypt.hash(password, saltRounds);
      await user.updateOne({ password: hashPass });
      res.status(200).json({
        code: 200,
        message: "Success",
      });
    }
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: "Can not Update",
      error: err,
    });
  }
};
