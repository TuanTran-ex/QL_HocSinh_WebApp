const mongoose = require("mongoose");
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

const Users = mongoose.model("Users", usersSchema, "Users");

module.exports = Users;
