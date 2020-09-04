const Student = require('../model/student.model');
const Class = require('../model/class.model')

module.exports.index = function(req, res) {
    Class.find().then(function(item) {
        res.render('class/index', {class_list: item});
    });
}
module.exports.search = function(req, res) {
    let q = req.query.q;
    Class.find().then(function(class_item){
        let list_filter = class_item.filter(function(item){
            return item.name.indexOf(q) !== -1;
        })
        res.render('class/index', { class_list: list_filter, search_key: q});
    });
}
module.exports.view = function(req, res) {
    let id = req.params.id;
    Class.findById(id).then(function(class_item) {
        Student.find({'class_id': id}).then(function(item) {
            res.render('class/view', 
            {
                class_item: class_item, 
                student_list: item,
                student_number: item.length
            });
        })
    })
}
module.exports.create = function(req, res) {
    res.render('class/create');
}
module.exports.postCreate = function(req, res) {
    let newDocument = new Class({
        name: req.body.class_name,
        phone_number: req.body.phone_number
    })
    newDocument.save();
    res.redirect('/class');
}
module.exports.delete = function(req, res) {
    let id = req.params.id;
    Class.findByIdAndRemove(id).then(function() {
        res.redirect('/class');
    })
}