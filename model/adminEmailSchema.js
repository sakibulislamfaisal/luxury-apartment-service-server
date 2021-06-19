const mongoose = require("mongoose");
const { Schema } = mongoose;
const adminEmailSchema = new Schema({

  email: {
    type: String,
    trim: true,
  },
 date: {
    type: Date,
    default: Date.now(),
  },
});

// const User = mongoose.model("User", userSchema);
module.exports = adminEmailSchema;
