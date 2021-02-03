const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dbAdmin1:Data1234@qlhs.yhzsi.mongodb.net/QLHS', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const classSchema = new mongoose.Schema({
  name: String,
  phone_number: String,
});

const Class = mongoose.model('Class', classSchema, 'Class');

module.exports = Class;
