const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dbAdmin1:Data1234@qlhs.yhzsi.mongodb.net/QLHS', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone_number: String,
  birthdate: String,
  address: String,
  classID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  }
});

const Student = mongoose.model('Student', studentSchema, 'Student');

module.exports = Student;
