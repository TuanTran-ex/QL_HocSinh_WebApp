const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Student = require('../model/student.model');
const Users = require('../model/users.model');
const Promise = require('bluebird');
// Update Student
const isObjectId = id => (mongoose.Types.ObjectId.isValid(id));
const update = async (id, data) => {
  try {
    const updateUser = await Student.findByIdAndUpdate(id, data);
    if (updateUser) {
      return { code: 200, data: data };
    } else {
      return { code: 404, data: null };
    }
  } catch (err) {
    return { code: 400, data: err };
  }
};

// ChangePass User
const changePass = async (username, password) => {
  try {
    const user = await Users.findOne({ username: username });
    if (!User) {
      return { code: 404, data: null };
    } else {
      const saltRounds = 10;
      const hashPass = await bcrypt.hash(password, saltRounds);
      const updateUser = await user.updateOne({ password: hashPass });
      return { code: 200, data: updateUser };
    }
  } catch (err) {
    return { code: 400, data: err };
  }
};

// Register User
const register = async (username, password, studentID) => {
  try {
    const user = await Users.findOne({ username: username });
    if (user) {
      return { code: 409, data: undefined };
    }
    if (studentID != null) {
      const student = await Student.findById(studentID);
      if (!student) {
        return { code: 404, data: undefined };
      }
      const saltRounds = 10;
      const hashPass = await bcrypt.hash(password, saltRounds);
      const newUser = new Users({
        username: username,
        password: hashPass,
        studentID: studentID,
      });
      await newUser.save();
      return { code: 200, data: newUser };
    } else {
      const saltRounds = 10;
      const hashPass = await bcrypt.hash(password, saltRounds);
      const newUser = new Users({
        username: username,
        password: hashPass,
        studentID: null,
        isAdmin: true,
      });
      await newUser.save();
      return { code: 200, data: newUser };
    }
  } catch (err) {
    return { code: 400, data: err };
  }
};
const registerPromise = (data) => {
  let { username, password, studentID } = data;
  return Users.findOne({ username }).then(async user => {
    if (user) return Promise.reject({ code: 10, messageDev: "username existed!" });
    if (studentID != null && isObjectId(studentID)) {
      const student = await Student.findById(studentID);
      if (student) return Promise.reject({ code: 11, messageDev: "student existed" });
    } else {
      studentID = mongoose.Types.ObjectId();
    }
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(password, saltRounds);
    const newUser = new Users({
      username,
      password: hashPass,
      studentID
    });
    return newUser.save();
  });
};

module.exports = { update, changePass, register, registerPromise };
