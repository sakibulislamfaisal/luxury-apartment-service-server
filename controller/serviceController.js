const mongoose = require("mongoose");
const serviceSchema = require("../model/serviceSchema");
const Service = new mongoose.model("Service", serviceSchema);
const User = require("../model/userSchema");

//Post new service

const createService = async (req, res) => {
  // console.log(newTodo);
  try {
    const data = new Service({
      ...req.body,
    });
    console.log(data);
    await data.save();
    res.status(200).json({
      message: "Service Data inserted successfully",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
};

//get all services
const getAllServices = (req, res) => {
  Service.find({}).exec((err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        length: data.length,
        data: data,
        status: "Success",
      });
    }
  });
};

// const createTodo = async (req, res) => {
//   const newTodo = new Todo({
//     ...req.body,
//     user: req.user._id,
//     //in populate this user used
//   });
//   // console.log(newTodo);
//   try {
//     const todo = await newTodo.save();
//     await User.updateOne(
//       {
//         _id: req.user._id,
//       },
//       {
//         $push: {
//           todos: todo._id,
//         },
//       }
//     );
//     res.status(200).json({
//       message: "Todo inserted successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: "There was a server side error!",
//     });
//   }
// };

//post multiple todo
const createManyTodo = (req, res) => {
  Todo.insertMany(req.body, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        data: data,
        message: "Todo were inserted successfully!",
      });
    }
  });
};

//update todo list'
const updateTodo = (req, res) => {
  Todo.updateOne(
    { _id: req.params.id },
    {
      $set: { status: "active" },
    },
    (err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          data: data,
          message: "Todo was updated successfully!",
        });
      }
    }
  );
};

//update manually
const updateManyTodo = (req, res) => {
  Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true },
    (err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          data: data,
          message: "Todo was updated successfully!",
        });
      }
    }
  );
};

//get all todo
const getAllTodo = (req, res) => {
  Todo.find({})
    .populate("user", "firstName lastName")
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          length: data.length,
          data: data,
          status: "Success",
        });
      }
    });
};

//get Specific todo list
const getSpecificTodo = (req, res) => {
  Todo.find({ status: "active" })
    .select({
      _id: 0,
      createdAt: 0,
    })
    .limit(2)
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          length: data.length,
          data: data,
          status: "Success",
        });
      }
    });
};

//Delete Todo
const deleteTodo = (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        data: data,
        message: "Todo was deleted successfully!",
      });
    }
  });
};

//GET active todo list using instance method
const activeTodo = async (req, res) => {
  //create document using model
  try {
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).json({
      data,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
};

const todoFindByJs = async (req, res) => {
  try {
    const data = await Todo.findByJs();
    res.status(200).json({
      data,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
};

const todoFindByLanguage = async (req, res) => {
  try {
    const data = await Todo.find().findByLanguage("React");
    res.status(200).json({
      data,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
};

module.exports = {
  createService,
  getAllServices,
  createManyTodo,
  updateTodo,
  updateManyTodo,
  getAllTodo,
  getSpecificTodo,
  deleteTodo,
  activeTodo,
  todoFindByJs,
  todoFindByLanguage,
};
