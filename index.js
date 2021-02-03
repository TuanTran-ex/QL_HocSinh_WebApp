const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv/config');

const classRouter = require('./route/Class.route');
const studentRouter = require('./route/Student.route');
const loginRouter = require('./route/Login.route');
const adminRouter = require('./route/Admin.route');
const userRouter = require('./route/User.route');

const passport = require('./middlewares/passport');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.set('views', './views');
app.set('view engine', 'pug');

app.use('/auth', loginRouter);
app.get('/', function (req, res) {
  res.render('index');
});

app.use(
  passport.authenticate('jwt', { session: false, failureRedirect: '/auth' })
);

app.use('/class', classRouter);
app.use('/students', studentRouter);
app.use('/admin', adminRouter);
app.use('/users', userRouter);

app.listen(port, function () {
  console.log('App listen on port ' + port);
});
