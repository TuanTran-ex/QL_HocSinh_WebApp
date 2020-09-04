const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Project_01', { useNewUrlParser: true });

const studentSchema = new mongoose.Schema({
    name: String,
    phone_number: String,
    birthdate: String,
    address: String,
    class_id: String
});

const Student = mongoose.model('Student',studentSchema, 'Student');

module.exports = Student;