const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
mongoose.connect("mongodb://localhost/Project_01", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  studentID: {
    type: String,
  },
});

usersSchema.method.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
  return token;
};

const Users = mongoose.model("Users", usersSchema, "Users");

module.exports = Users;
