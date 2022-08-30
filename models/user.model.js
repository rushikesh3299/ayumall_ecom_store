const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: "Account already exists for this email",
    required: "Email id is required",
  },
  password: {
    type: String,
    required: "Password is required",
  },
  firstname: {
    type: String,
    required: "first name is required"
  },
  lastname: {
    type: String,
    required: "last name is required"
  }
})

const User = mongoose.model("User", UserSchema);
module.exports = { User };