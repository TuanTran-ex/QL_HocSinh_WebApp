const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;

const Users = require('../model/users.model');

var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) token = req.cookies['auth-token'];
  return token;
};

const opt = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_KEY,
};

const strategy = new JwtStrategy(opt, async (jwt_payload, done) => {
  try {
    const user = await Users.findById(jwt_payload._id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});

passport.use(strategy);
module.exports = passport;
