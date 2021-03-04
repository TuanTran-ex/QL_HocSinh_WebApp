const Class = require('../model/class.model');
const User = require('../model/users.model');
const Teachers = require('../model/teacher.model');
const utils = require('../utils/utils');

const {
  createTeacherValidation,
  updateTeacherValidation,
} = require('../middlewares/Validation');

module.exports.index = (req, res) => {
  Teachers.find().then((item) => {
    res.render('teacher/index', { teacher_list: item });
  });
};

module.exports.search = async (req, res) => {
  var q = req.query.q;
  try {
    const teacherList = await Teachers.find({
      name: { $regex: '.*' + q + '.*' },
    });
    res.render('teacher/index', { teacher_list: teacherList, search_key: q });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Can not find',
      error: err,
    });
  }
};

module.exports.create = (req, res) => {
  res.render('teacher/create');
};

module.exports.postCreate = async (req, res) => {
  const { error } = createTeacherValidation(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: 'Data error',
      error: error.details[0].message,
    });
  } else {
    utils.userGenerator(req.body.teacher_name, req.body.role).then(user => {
      console.log(user);
      const newDocument = new Teachers({
        name: req.body.teacher_name,
        phone_number: req.body.phone_number,
        birthdate: req.body.birthdate,
        address: req.body.address,
        userID: user.newUser._id,
      });
      newDocument.save();
      res.status(200).json({
        success: true,
        data: newDocument,
        password: user.password,
      });
    }).catch(err => {
      res.status(400).json({
        code: err.code,
        success: false,
        message: 'Can not create new user',
        error: err,
      });
    })
  }
};

module.exports.view = async (req, res) => {
  const id = req.params.id;
  try {
    const teacher_item = await Teachers.findById(id);
    const item = await Class.findOne({teacherID: teacher_item._id});
    if (!teacher_item) {
      res.status(404).json({
        success: false,
        message: 'Student or class not found',
      });
    } else {
      res.render('teacher/view', {
        teacher_item: teacher_item,
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

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const removedTeacher = await Teachers.findByIdAndRemove(id);
    const removedUser = await User.findOneAndRemove({ teacherID: id });
    if (!removedTeacher) {
      res.status(404).json({
        success: false,
        message: 'Wrong ID',
      });
    } else {
      res.status(200).json({
        success: true,
        data: removedTeacher,
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

module.exports.updateTeacher = async (req, res) => {
  const { error } = updateTeacherValidation(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: 'Data error',
      error: error.details[0].message,
    });
  } else {
    const id = req.params.id;
    const teacher = Teachers.findById(id);
    utils
      .update(teacher.userID, req.body, 'teacher')
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
