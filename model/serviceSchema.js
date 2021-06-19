const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  price: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // user: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "User",
  // },
});

// //Instance Method
// todoSchema.methods = {
//   findActive: function () {
//     return mongoose.model("Todo").find({ status: "inactive" });
//   },
// };

// //static methods
// todoSchema.statics = {
//   findByJs: function () {
//     return this.find({ title: /js/i });
//   },
// };

// //query helpers means query chaining

// todoSchema.query = {
//   findByLanguage: function (language) {
//     return this.find({ title: new RegExp(language, "i") });
//   },
// };

module.exports = serviceSchema;
