const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dbAdmin1:Data1234@qlhs.yhzsi.mongodb.net/QLHS', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone_number: String,
  birthdate: String,
  address: String,
  userID: {
    type: String,
    required: true,
  }
});

const Teachers = mongoose.model('Teachers', teacherSchema, 'Teachers');

module.exports = Teachers;
