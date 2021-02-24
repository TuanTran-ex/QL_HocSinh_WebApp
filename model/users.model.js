const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dbAdmin1:Data1234@qlhs.yhzsi.mongodb.net/QLHS', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['admin', 'teacher', 'student'],
  },
  studentID: {
    type: String,
    default: null,
  },
  teacherID: {
    type: String,
    default: null,
  },
});

const Users = mongoose.model('Users', usersSchema, 'Users');

module.exports = Users;
