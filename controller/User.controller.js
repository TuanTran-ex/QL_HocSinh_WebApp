const bcrypt = require('bcrypt');
const utils = require('../utils/utils');

const {
  updateStudentValidation,
  loginValidation,
} = require('../middlewares/Validation');

const User = require('../model/users.model');
const Student = require('../model/student.model');
const Class = require('../model/class.model');

module.exports.index = async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      res.status(404).json({
        code: 404,
        success: false,
        message: 'User not found',
      });
    } else {
      const student = await Student.findById(user.studentID);
      if (!student) {
        res.status(500).json({
          code: 500,
          success: false,
          message: 'Wrong data user',
        });
      } else {
        const classItem = await Class.findOne({ _id: student.class_id });
        res.render('user/index', {
          student_item: student,
          class_name: classItem ? classItem.name : '',
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: 'Syntax Error',
      error: err,
    });
  }
};

module.exports.update = async (req, res) => {
  const { error } = updateStudentValidation(req.body);
  if (error) {
    res.status(400).json({
      code: 400,
      success: false,
      message: 'Data error',
      error: error.details[0].message,
    });
  } else {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      const update = await utils.update(user.studentID, req.body);
      if (update.code === 404) {
        res.status(404).json({
          code: 404,
          success: false,
          message: 'Student not found! Wrong ID',
        });
      } else if (update.code === 200) {
        res.status(200).json({
          code: 200,
          success: true,
          data: update.data,
        });
      } else if (update.code === 400) {
        res.status(400).json({
          code: 400,
          success: false,
          message: 'Bad request. Wrong syntax Student id',
          error: update.data,
        });
      }
    } catch (err) {
      res.status(400).json({
        code: 400,
        success: false,
        message: 'Bad request. Wrong syntax Student id',
        error: err,
      });
    }
  }
};

module.exports.changePassPage = (req, res) => {
  res.render('user/changePass');
};

module.exports.changePass = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    res.status(400).json({
      code: 400,
      success: false,
      message: 'Data error',
      error: error.details[0].message,
    });
  } else {
    const { username, password } = req.body;
    const result = await util.changePass(username, password);
    if (result.code === 404) {
      res.status(404).json({
        code: 404,
        success: false,
        message: 'User not found',
      });
    } else if (result.code === 200) {
      res.status(200).json({
        code: 200,
        success: true,
        data: updateUser,
      });
    } else if (result.code === 400) {
      res.status(400).json({
        code: 400,
        success: false,
        message: 'Can not Update',
        error: err,
      });
    }
  }
};
