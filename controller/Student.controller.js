const Student = require("../model/student.model");
const Class = require("../model/class.model");
const User = require("../model/users.model");
const bcrypt = require("bcrypt");

module.exports.index = (req, res) => {
  Student.find().then(function (student_item) {
    res.render("student/index", { student_list: student_item });
  });
};

module.exports.search = async (req, res) => {
  var q = req.query.q;
  try {
    const studentList = await Student.find({
      name: { $regex: ".*" + q + ".*" },
    });
    res.render("student/index", { student_list: studentList, search_key: q });
  } catch (err) {
    res.status(400).json({
      code: 404,
      message: "Can not find",
      error: err,
    });
  }
};

module.exports.view = async (req, res) => {
  const id = req.params.id;
  try {
    const student_item = await Student.findById(id);
    const item = await Class.findById(student_item.class_id);
    if (!student_item) {
      res.status(404).json({
        code: 404,
        message: "Student or class not found",
      });
    } else {
      res.render("student/view", {
        student_item: student_item,
        class_name: item ? item.name : "",
      });
    }
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: "Can not find. Maybe syntax of id is wrong",
    });
  }
};

module.exports.create = (req, res) => {
  Class.find().then(function (class_item) {
    res.render("student/create", { class_list: class_item });
  });
};

module.exports.postCreate = async (req, res) => {
  const newDocument = new Student({
    name: req.body.student_name,
    phone_number: req.body.phone_number,
    birthdate: req.body.birthdate,
    address: req.body.address,
    class_id: req.body.class_id,
  });
  try {
    newDocument.save();
    res.redirect("/students");
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: "Can not create new user",
      error: err,
    });
  }
};

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const removedStudent = await Student.findByIdAndRemove(id);
    const removedUser = await User.findOneAndRemove({ studentID: id });
    if (!removedStudent) {
      res.status(404).json({
        code: 404,
        message: "Wrong ID",
      });
    } else {
      res.status(200).json({
        code: 200,
        message: "Success",
        data: removedStudent,
      });
    }
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: "Can not delete. Wrong syntax",
      error: err,
    });
  }
};

module.exports.updateStudent = async (req, res) => {
  const id = req.params.id;

  try {
    const updateUser = await Student.findByIdAndUpdate(id, req.body);
    if (updateUser) {
      res.status(200).send(updateUser);
    } else {
      res.status(404).json({
        code: 404,
        message: "Student not found! Wrong ID",
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
