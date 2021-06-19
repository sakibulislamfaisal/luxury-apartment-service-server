const mongoose = require("mongoose");
const serviceSchema = require("../model/serviceSchema");
const Service = new mongoose.model("Service", serviceSchema);
const serviceOrderSchema = require("../model/serviceOrder");
const serviceOrder = new mongoose.model("Order", serviceOrderSchema);
const reviewSchema = require("../model/reviewSchema");
const reviewCustomer = new mongoose.model("Review", reviewSchema);

//Post new service

const createService = async (req, res) => {
  // console.log(newTodo);
  try {
    const data = new Service({
      ...req.body,
    });
    console.log("service data", data);
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

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    res.status(200).json({
      status: "success",
      result: service,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Error",
    });
  }
};

//Delete service
const deleteService = (req, res) => {
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

//service order

const serviceOrderPlaced = async (req, res) => {
  // console.log(newTodo);
  try {
    const data = new serviceOrder({
      ...req.body,
    });
    console.log(data);
    await data.save();
    res.status(200).json({
      message: "Order Placed Successfully!",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
};

//get service order
const getAllServiceOrder = (req, res) => {
  serviceOrder.find({}).exec((err, data) => {
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

const getServiceByEmail = async (req, res) => {
  try {
    const service = await serviceOrder.find({ email: req.params.email });
    res.status(200).json({
      status: "success",
      result: service,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "There was a server side error!",
    });
  }
};

//review section

const reviewService = async (req, res) => {
  // console.log(newTodo);
  try {
    const data = new reviewCustomer({
      ...req.body,
    });
    console.log(data);
    await data.save();
    res.status(200).json({
      message: "Customer review added successfully!",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
};

//get customer review

const getAllReview = (req, res) => {
  reviewCustomer.find({}).exec((err, data) => {
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

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  serviceOrderPlaced,
  getServiceByEmail,
  reviewService,
  getAllReview,
  getAllServiceOrder,
};
