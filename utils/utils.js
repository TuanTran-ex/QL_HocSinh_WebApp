const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Student = require('../model/student.model');
const Users = require('../model/users.model');
const Teacher = require('../model/teacher.model');
const Promise = require('bluebird');
// Update Student
const isObjectId = id => (mongoose.Types.ObjectId.isValid(id));
const update = (id, data) => {
  return Student.findByIdAndUpdate(id, data).then(student => {
    if (!student) return Promise.reject({code: 9, messageDev: 'user not existed!'});
    else return student;
  }).catch(err => {
    return Promise.reject({code: 13, messageDev: 'syntax error'});
  })
};

// ChangePass User
const changePass = (username, password) => {
  return Users.findOne({ username: username }).then(async user => {
    if (!user) return Promise.reject({code: 9, messageDev: 'user not existed!'});
    else {
      const saltRounds = 10;
      const hashPass = await bcrypt.hash(password, saltRounds);
      const updateUser = await user.updateOne({ password: hashPass });
      return updateUser;
    }
  }).catch(err => {
    return Promise.reject({code: 13, messageDev: 'syntax error'});
  });
};

// Register User
const registerPromise = (data) => {
  let { username, password, id, role } = data;
  return Users.findOne({ username }).then(async user => {
    if (user) return Promise.reject({ code: 10, messageDev: "username existed!" });
    if (role === 'admin') {
      const saltRounds = 10;
      const hashPass = await bcrypt.hash(password, saltRounds);
      const newUser = new Users({
        username,
        password: hashPass,
        role: 'admin',
      });
      return newUser.save();
    } else if (role === 'student') {
      if (id != null && isObjectId(id)) {
        const student = await Student.findById(id);
        if (!student) return Promise.reject({ code: 11, messageDev: "student not existed" });
      } else {
        return Promise.reject({ code: 13, messageDev: "syntax error" });
      }
      const saltRounds = 10;
      const hashPass = await bcrypt.hash(password, saltRounds);
      const newUser = new Users({
        username,
        password: hashPass,
        role: role,
        studentID: id,
      });
      return newUser.save();
    } else if (role === 'teacher') {
      if (id != null && isObjectId(id)) {
        const teacher = await Teacher.findById(id);
        if (!teacher) return Promise.reject({ code: 12, messageDev: "teacher not existed" });
      } else {
        return Promise.reject({ code: 13, messageDev: "syntax error" });
      }
      const saltRounds = 10;
      const hashPass = await bcrypt.hash(password, saltRounds);
      const newUser = new Users({
        username,
        password: hashPass,
        role: role,
        teacherID: id,
      });
      return newUser.save();
    }
  });
};

module.exports = { update, changePass, registerPromise};
