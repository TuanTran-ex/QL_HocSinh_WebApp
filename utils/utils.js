const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Student = require('../model/student.model');
const Users = require('../model/users.model');
const tmpUsers = require('../model/tmpUsers.model');
const Teacher = require('../model/teacher.model');
const Promise = require('bluebird');
const randomstring = require('randomstring');
// Update Student
const isObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const update = (id, data, role) => {
  if (role === 'student') {
    return Student.findOneAndUpdate({ userID: id }, data)
      .then((student) => {
        if (!student)
          return Promise.reject({ code: 9, messageDev: 'user not existed!' });
        else return student;
      })
      .catch((err) => {
        return Promise.reject({ code: 13, messageDev: 'syntax error' });
      });
  } else if (role === 'teacher') {
    return Teacher.findOneAndUpdate({ userID: id }, data)
      .then((teacher) => {
        if (!teacher)
          return Promise.reject({ code: 9, messageDev: 'user not existed!' });
        else return teacher;
      })
      .catch((err) => {
        return Promise.reject({ code: 13, messageDev: 'syntax error' });
      });
  }
};

// ChangePass User
const changePass = (username, oldPass, newPass) => {
  return Users.findOne({ username: username }).then(async (user) => {
    // console.log(user);
    if (!user)
      return Promise.reject({ code: 9, messageDev: 'user not existed!' });
    else {
      const checkPass = await bcrypt.compare(oldPass, user.password);
      if (!checkPass) {
        return Promise.reject({ code: 10, messageDev: 'Password wrong' });
      } else {
        const saltRounds = 10;
        const hashPass = await bcrypt.hash(newPass, saltRounds);
        console.log(hashPass);
        const updateUser = await user.updateOne({ password: hashPass });
        return updateUser;
      }
    }
  });
};

// Register User
const registerPromise = (data) => {
  let { username, password, id, role } = data;
  return Users.findOne({ username }).then(async (user) => {
    if (user)
      return Promise.reject({ code: 10, messageDev: 'username existed!' });
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
        if (!student)
          return Promise.reject({
            code: 11,
            messageDev: 'student not existed',
          });
      } else {
        return Promise.reject({ code: 13, messageDev: 'syntax error' });
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
        if (!teacher)
          return Promise.reject({
            code: 12,
            messageDev: 'teacher not existed',
          });
      } else {
        return Promise.reject({ code: 13, messageDev: 'syntax error' });
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

const userGenerator = async (role) => {
  let count = (await Users.find()).length + 1;
  let username;
  let check = true;
  while (check) {
    username = 'user' + count;
    const user = await Users.findOne({ username });
    if (user) {
      count = count + 1;
    } else {
      check = false;
    }
  }
  try {
    const password = await randomstring.generate(10);
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(password, saltRounds);
    const newUser = new Users({
      username,
      password: hashPass,
      role: role,
    });
    await newUser.save();
    const tmpUser = new tmpUsers({
      username,
      password: password,
      userID: newUser._id,
    });
    await tmpUser.save();
    return { newUser, password };
  } catch (err) {
    return Promise.reject({ code: 13, messageDev: 'syntax error', error: err });
  }
};

module.exports = { update, changePass, registerPromise, userGenerator };
