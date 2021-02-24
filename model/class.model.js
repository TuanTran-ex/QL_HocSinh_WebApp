const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dbAdmin1:Data1234@qlhs.yhzsi.mongodb.net/QLHS', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone_number: String,
  teacherID: {
    type: String,
    default: null,
  },
});

const Class = mongoose.model('Class', classSchema, 'Class');

module.exports = Class;
