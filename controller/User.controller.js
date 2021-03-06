const bcrypt = require('bcrypt');
const utils = require('../utils/utils');
const path = require('path');

const {
  updateStudentValidation,
  changePassValidation,
} = require('../middlewares/Validation');

const User = require('../model/users.model');
const Student = require('../model/student.model');
const Class = require('../model/class.model');
const Teachers = require('../model/teacher.model');
const tmpUsers = require('../model/tmpUsers.model');

module.exports.index = async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    } else if (req.user._id != userID) {
      return res
        .status(403)
        .sendFile(path.join(__dirname, '../public', 'html', '403_page.html'));
    } else {
      const student = await Student.findOne({ userID: userID });
      if (student) {
        const classItem = await Class.findOne({ _id: student.classID });
        res.render('user/index', {
          item: student,
          isAdmin: false,
          class_name: classItem ? classItem.name : '',
          class_id: classItem ? classItem._id : '',
        });
      } else {
        const teacher = await Teachers.findOne({ userID: userID });
        if (teacher) {
          const classItem = await Class.findOne({ teacherID: teacher._id });
          res.render('user/index', {
            item: teacher,
            isAdmin: false,
            class_name: classItem ? classItem.name : '',
            class_id: classItem ? classItem._id : '',
          });
        } else {
          res.status(500).json({
            success: false,
            message: 'Wrong data user',
          });
        }
      }
    }
  } catch (err) {
    res.status(400).json({
      message: 'Syntax Error',
      error: err,
    });
  }
};

module.exports.update = async (req, res) => {
  const { error } = updateStudentValidation(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: 'Data error',
      error: error.details[0].message,
    });
  } else {
    const id = req.params.id;
    const user = await User.findById(id);
    const role = user.role;
    utils
      .update(id, req.body, role)
      .then((user) => {
        res.status(200).json({ success: true, data: user });
      })
      .catch((err) => {
        let resp = Object.assign(
          { success: false },
          { code: err.code, message: err.message || err.messageDev }
        );
        if (err.code === 9) res.status(404).json(resp);
        else res.status(400).json(resp);
      });
  }
};

module.exports.changePassPage = (req, res) => {
  res.render('user/changePass');
};

module.exports.changePass = async (req, res) => {
  const { error } = changePassValidation(req.body);
  if (error) {
    res.status(400).json({
      code: 8,
      success: false,
      message: 'Data error',
      error: error.details[0].message,
    });
  } else {
    const { oldPass, newPass } = req.body;
    utils
      .changePass(req.user.username, oldPass, newPass)
      .then(async (updateUser) => {
        const removeTmpUser = await tmpUsers.findOneAndDelete({ username: req.user.username });
        res.status(200).json({ success: true, data: updateUser });
      })
      .catch((err) => {
        let resp = Object.assign(
          { success: false },
          { code: err.code, message: err.message || err.messageDev }
        );
        if (err.code === 9) res.status(404).json(resp);
        else res.status(400).json(resp);
      });
  }
};
