const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../model/users.model');
const utils = require('../utils/utils');
const {
  registerValidation,
  loginValidation,
  forgotPassValidation,
} = require('../middlewares/Validation');

module.exports.index = (req, res) => {
  res.render('validate/login.pug');
};

module.exports.registerPage = (req, res) => {
  res.render('validate/register.pug');
};

// Login
module.exports.login = async (req, res) => {
  // Validation data from client
  const { error } = loginValidation(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: 'Username or password wrong',
      error: error.details[0].message,
    });
  } else {
    const { username, password } = req.body;
    const user = await Users.findOne({ username: username });
    if (!user)
      res.status(404).json({
        success: false,
        message: 'Not found user',
      });
    else {
      const truePass = await bcrypt.compare(password, user.password);
      if (!truePass) {
        res.status(400).json({
          success: false,
          message: 'Wrong password',
        });
      } else {
        if(user.isFirstLogin) {
          await user.updateOne({isFirstLogin: false});
          res.status(200).json({code: 5, success: true, message: 'First Login'});
        } else {
          try {
            const token = await jwt.sign({ _id: user._id }, process.env.JWT_KEY);
            res
            .cookie('auth-token', token, { maxAge: 240000 })
            .status(200)
            .json({
              success: true,
              data: { user, token },
            });
          } catch (err) {
            res.status(500).json({
              success: false,
              message: 'Can not create token',
              error: err,
            });
          }
        }
      }
    }
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie('auth-token').redirect('/auth');
};

module.exports.register = (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  } else {
    utils.registerPromise(req.body).then(user => {
      delete user.password;
      res.status(200).json({ success: true, data: user });
    }).catch(e => {
      let resp = Object.assign({ success: false }, { code: e.code, message: e.message || e.messageDev });
      res.status(400).json(resp);
    });
  }
};

// Register admin
module.exports.adminRegister = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: 'Data error',
      error: error.details[0].message,
    });
  } else {
    const { username, password } = req.body;
    const reg = await utils.register(username, password, null);
    if (reg.code === 409) {
      res.status(409).json({
        success: false,
        message: 'Username already exist',
      });
    } else if (reg.code === 200) {
      res.status(200).json({
        success: true,
        data: reg.data,
      });
    } else if (reg.code === 400) {
      res.status(400).json({
        success: false,
        message: 'Can not create new account. Syntax error',
        error: reg.data,
      });
    }
  }
};

// Forgot Password
module.exports.forgotPassPage = (req, res) => {
  res.render('validate/forgotPass');
};

module.exports.forgotPass = async (req, res) => {
  const { error } = forgotPassValidation(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: 'Data error',
      error: error.details[0].message,
    });
  } else {
    const { username, newpass } = req.body;
    const user = await Users.findOne({ username: username });
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found!',
      });
    } else {
      try {
        const saltRounds = 10;
        const hashPass = await bcrypt.hash(newpass, saltRounds);
        user.password = hashPass;
        await user.save();
        res.status(200).json({
          success: true,
          data: user,
        });
      } catch (err) {
        res.status(400).json({
          success: false,
          message: 'Bad request. Password wrong or can not Update',
          error: err,
        });
      }
    }
  }
};
