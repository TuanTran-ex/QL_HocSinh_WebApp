const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Project_01', { useNewUrlParser: true });

const classSchema = new mongoose.Schema({
    name: String,
    phone_number: String
});

const Class = mongoose.model('Class', classSchema, 'Class');

module.exports = Class;