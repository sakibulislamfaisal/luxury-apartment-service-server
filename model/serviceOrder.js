const mongoose = require("mongoose");

const serviceOrderSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  title: {
    type: String,
  },
  price: {
    type: String,
  },
  username: {
    type: String,
  },
  payment: String,
  image: { type: String },
  creation: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = serviceOrderSchema;
