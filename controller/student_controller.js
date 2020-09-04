const Student = require('../model/student.model');
const Class = require('../model/class.model');

module.exports.index = function(req, res) {
    Student.find().then(function(student_item) {
        res.render('student/index', {student_list: student_item});
    });
}
module.exports.search = function(req, res) {
    var q = req.query.q;
    Student.find().then(function(student_item) {
        var list_filter = student_item.filter(function(item) {
            return item.name.indexOf(q) !== -1;
        })
        res.render('student/index', {student_list: list_filter, search_key: q});
    })
}
module.exports.view = function(req, res) {
    var id = req.params.id;
    Student.findById(id).then(function(student_item) {
        Class.findById(student_item.class_id).then(function(item) {
            res.render('student/view', {student_item: student_item, class_name: item ? item.name : ""});
        })
    })
}
module.exports.create = function(req, res) {
    Class.find().then(function(class_item) {
        res.render('student/create', {class_list: class_item});
    })
}
module.exports.postCreate = function(req, res) {
    var newDocument = new Student({
        name: req.body.student_name,
        phone_number: req.body.phone_number,
        birthdate: req.body.birthdate,
        address: req.body.address,
        class_id: req.body.class_id
    })
    newDocument.save();
    res.redirect('/student');
}
module.exports.delete = function(req, res) {
    let id = req.params.id;
    Student.findByIdAndRemove(id).then(function() {
        res.redirect('/student');
    })
}