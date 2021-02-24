const Student = require('../model/student.model');
const Class = require('../model/class.model');
const Teacher = require('../model/teacher.model');

const {
  createClassValidation,
  updateClassValidation,
} = require('../middlewares/Validation');

module.exports.index = function (req, res) {
  Class.find().then(function (item) {
    res.render('class/index', { class_list: item });
  });
};

module.exports.search = async (req, res) => {
  let q = req.query.q;
  const classList = await Class.find({ name: { $regex: '.*' + q + '.*' } });
  res.render('class/index', { class_list: classList, search_key: q });
};

module.exports.view = async (req, res) => {
  const id = req.params.id;
  const isAdmin = (req.user.role === 'admin');
  try {
    const classItem = await Class.findById(id);
    if (!classItem) {
      res.status(404).json({
        success: false,
        message: 'Class not found',
      });
    } else {
      const studentItem = await Student.find({ classID: id });
      const studentList = await Student.find({classID: { $ne: id }});
      const teacherItem = await Teacher.findOne({ _id: classItem.teacherID });
      const teacherList = await Teacher.find();
      res.render('class/view', {
        class_item: classItem,
        teacher_list: teacherList,
        teacher_item: teacherItem ? teacherItem : '',
        student_list: studentItem,
        student_number: studentItem.length,
        allStudent_list: studentList,
        isAdmin: isAdmin,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Can not find class. Syntax err',
      error: err,
    });
  }
};

module.exports.create = function (req, res) {
  res.render('class/create');
};

module.exports.postCreate = async (req, res) => {
  const { error } = createClassValidation(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: 'Data error',
      error: error.details[0].message,
    });
  } else {
    const newDocument = new Class({
      name: req.body.class_name,
      phone_number: req.body.phone_number,
    });
    try {
      await newDocument.save();
      res.status(200).json({
        success: true,
        data: newDocument,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: 'Can not create new class. Syntax error',
        error: error,
      });
    }
  }
};

module.exports.updateClass = async (req, res) => {
  const { error } = await updateClassValidation(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: 'Data error',
      error: error.details[0].message,
    });
  } else {
    const id = req.params.id;
    try {
      const updateClass = await Class.findByIdAndUpdate(id, req.body);
      if (updateClass) {
        res.status(200).json({
          success: true,
          data: updateClass,
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Class not found! Wrong ID',
        });
      }
    } catch (err) {
      res.status(400).json({
        success: false,
        message: 'Bad request. Wrong syntax Class id',
        error: err,
      });
    }
  }
};

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const removedClass = await Class.findByIdAndRemove(id);
    if (!removedClass) {
      res.status(404).json({
        success: false,
        message: 'Class not found',
      });
    } else {
      res.status(200).json({
        success: true,
        data: removedClass,
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
