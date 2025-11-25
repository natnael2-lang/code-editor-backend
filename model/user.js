const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },

  // NEW → only admin can post questions
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
