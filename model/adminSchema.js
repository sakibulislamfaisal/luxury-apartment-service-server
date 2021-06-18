const mongoose = require("mongoose");
const { Schema } = mongoose;
const adminSchema = new Schema({

  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "admin",
  },
 
  date: {
    type: Date,
    default: Date.now(),
  },
});

// const User = mongoose.model("User", userSchema);
module.exports = adminSchema;
