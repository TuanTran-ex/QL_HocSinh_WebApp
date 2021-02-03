const bcrypt = require('bcrypt');

const Student = require('../model/student.model');
const Users = require('../model/users.model');

// Update Student
const update = async (id, data) => {
    try {
      const updateUser = await Student.findByIdAndUpdate(id, data);
      if (updateUser) {
        return {code: 200, data: data}
      } else {
        return {code: 404, data: null}
      }
    } catch (err) {
      return {code: 400, data: err}
    }
};

// ChangePass User
const changePass = async (username, password) => {
  try {
    const user = await Users.findOne({ username: username });
    if (!User) {
      return {code: 404, data: null};
    } else {
      const saltRounds = 10;
      const hashPass = await bcrypt.hash(password, saltRounds);
      const updateUser = await user.updateOne({ password: hashPass });
      return {code: 200, data: updateUser};
    }
  } catch (err) {
    return {code: 400, data: err};
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
        return {code: 404, data: undefined};
      }
      const saltRounds = 10;
      const hashPass = await bcrypt.hash(password, saltRounds);
      const newUser = new Users({
        username: username,
        password: hashPass,
        studentID: studentID,
      });
      await newUser.save();
      return {code: 200, data: newUser};
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
      return {code: 200, data: newUser};
    }
  } catch (err) {
    return {code: 400, data: err};
  }
};

module.exports = { update, changePass, register };
