const express = require('express');

const Class_router = require('./route/class_route');
const Student_router = require('./route/student_route');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('index');
});
app.use('/class', Class_router);
app.use('/student', Student_router);

app.listen(port, function() {
    console.log('App listen on port ' + port);
});
