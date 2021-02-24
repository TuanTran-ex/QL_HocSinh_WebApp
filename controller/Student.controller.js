const Student = require('../model/student.model');
const Class = require('../model/class.model');
const User = require('../model/users.model');
const utils = require('../utils/utils');

const {
  createStudentValidation,
  updateStudentValidation,
} = require('../middlewares/Validation');

module.exports.index = (req, res) => {
  Student.find().then(function (student_item) {
    res.render('student/index', { student_list: student_item });
  });
};
module.exports.search = async (req, res) => {
  var q = req.query.q;
  try {
    const studentList = await Student.find({
      name: { $regex: '.*' + q + '.*' },
    });
    res.render('student/index', { student_list: studentList, search_key: q });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Can not find',
      error: err,
    });
  }
};

module.exports.view = async (req, res) => {
  const id = req.params.id;
  try {
    const student_item = await Student.findById(id);
    const item = await Class.findById(student_item.classID);
    if (!student_item) {
      res.status(404).json({
        success: false,
        message: 'Student or class not found',
      });
    } else {
      res.render('student/view', {
        student_item: student_item,
        class_name: item ? item.name : '',
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Can not find. Maybe syntax of id is wrong',
      error: err,
    });
  }
};

module.exports.create = (req, res) => {
  Class.find().then(function (class_item) {
    res.render('student/create', { class_list: class_item });
  });
};

module.exports.postCreate = async (req, res) => {
  const { error } = createStudentValidation(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: 'Data error',
      error: error.details[0].message,
    });
  } else {
    const newDocument = new Student({
      name: req.body.student_name,
      phone_number: req.body.phone_number,
      birthdate: req.body.birthdate,
      address: req.body.address,
      classID: req.body.class_id,
    });
    try {
      newDocument.save();
      res.status(200).json({
        success: true,
        data: newDocument,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: 'Can not create new user',
        error: err,
      });
    }
  }
};

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const removedStudent = await Student.findByIdAndRemove(id);
    const removedUser = await User.findOneAndRemove({ studentID: id });
    if (!removedStudent) {
      res.status(404).json({
        success: false,
        message: 'Wrong ID',
      });
    } else {
      res.status(200).json({
        success: true,
        data: removedStudent,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Can not delete. Wrong syntax',
      error: err,
    });
  }
};

module.exports.updateStudent = async (req, res) => {
  const { error } = updateStudentValidation(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: 'Data error',
      error: error.details[0].message,
    });
  } else {
    const id = req.params.id;
    utils
      .update(id, req.body)
      .then((student) => {
        res.status(200).json({ success: true, data: student });
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
