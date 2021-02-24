const bcrypt = require('bcrypt');
const utils = require('../utils/utils');
const path = require('path');

const {
  updateStudentValidation,
  loginValidation,
} = require('../middlewares/Validation');

const User = require('../model/users.model');
const Student = require('../model/student.model');
const Class = require('../model/class.model');
const Teachers = require('../model/teacher.model');

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
      if (user.studentID != null) {
        const student = await Student.findById(user.studentID);
        if (student) {
          const classItem = await Class.findOne({ _id: student.classID });
          res.render('user/index', {
            item: student,
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
      } else if (user.teacherID != null) {
        const teacher = await Teachers.findById(user.teacherID);
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
    utils
      .update(user.studentID, req.body)
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
  const { error } = loginValidation(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: 'Data error',
      error: error.details[0].message,
    });
  } else {
    const { username, password } = req.body;
    utils
      .changePass(username, password)
      .then((updateUser) => {
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
