const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const userSchema = require("../model/userSchema");
const User = new mongoose.model("User", userSchema);
const adminSchema = require("../model/adminSchema");
const Admin = new mongoose.model("Admin", adminSchema);
const serverError = require("../utils/errorHandle/error");
const router = express.Router();

//POST A USER

const createUser = async (req, res) => {
  //show error message in this object
  const errors = {};
  try {
    const { username, email, password, role, image } = req.body;
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      errors.email = "Email Already Exist!";
      return res.json({ message: errors.email });
    }
    const newUser = new User({
      username,
      email,
      password,
      role: role || "user",
      image,
    });
    const accessToken = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.jwtExpire }
    );
    newUser.accessToken = accessToken;
    bcrypt.genSalt(10, (err, salted) => {
      if (!err) {
        bcrypt.hash(newUser.password, salted, (err, hash) => {
          newUser.password = hash;
          newUser.save().then((result) => {
            res.status(201).json({
              result,
              accessToken: `Bearer ${accessToken}`,
              message: "Signup was successful!",
            });
          });
        });
      } else {
        res.status(500).json({
          message: "Signup failed!!",
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Signup failed!",
    });
  }
};

//Login a user with email and password
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.json({ status: "fail", email: "This email not found!" });
        }
        bcrypt.compare(password, user.password, (err, data) => {
          if (!err) {
            if (data) {
              const payload = {
                userId: user._id,
                email: user.email,
                username: user.username,
                password: user.password,
                role: user.role,
                image: user.image,
              };
              const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: process.env.jwtExpire,
              });

              return res.status(200).json({
                result: {
                  userId: user._id,
                  username: user.username,
                  email: user.email,
                  role: user.role,
                  image: user.image,
                },
                access_token: `Bearer ${token}`,
                status: "success",
                message: "Login is successful!",
              });
            }
            return res.json({
              status: "fail",
              passMsg: "Password does not match",
            });
          }
        });
      })
      .catch((err) => serverError(res, err));
  } catch (err) {
    res.status(401).json({
      error: "Authentication failed!",
    });
  }
};

//GET ALL USER
const getAllUsers = async (req, res) => {
  // console.log(req.user);
  try {
    const user = await User.find({});
    if (user && user.length > 0) {
      res.status(200).json({
        message: "Success",
        length: user.length,
        result: user,
      });
    } else {
      res.status(404).json({
        message: "Data not found!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "There was a server side error!",
    });
  }
};

//FIND SINGLE USER BY ID
const singleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    //select (-password => means that is not show when data is accessed from database);
    res.status(200).json({
      status: "success",
      result: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Error",
    });
  }
};

//FIND BY EMAIL
const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select(
      "-password"
    );
    res.status(200).json({
      status: "success",
      result: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "There was a server side error!",
    });
  }
};

//DELETE A USER
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      result: user,
      message: "User has been deleted successfully!",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "There was a server side error!",
    });
  }
};

//UPDATE USER
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.file.path,
      req.body,
      { new: true, runValidators: true },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({
            status: "success",
            message: "User has been updated successfully!",
            result,
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      message: "There was a server side error!",
    });
  }
};

//UPDATE USER
const updateUserProfile = async (req, res) => {
  const id = req.body.user_id;
  const profilePic = req.file.path;
  User.findById(id, function (err, data) {
    if (data) {
      res.status(200).json({
        status: "success",
        message: "User has been updated successfully!",
        profilePic,
        data,
      });
    } else {
      res.status(404).json({
        message: "User does not exist",
      });
    }
  });
};

const restricted = (req, res, next) => {
  const { role } = req.user;
  console.log("your role is " + role);
  if (role !== "admin") {
    res.status(401).json({
      status: "fail to access Data",
      message: "You do not have permission to this action",
      error:
        "Admin can perform this operation only!! No user is allowed to perform this action!!",
    });
  } else if (role === "admin") {
    next();
  }
};

//add admin

const createAdmin = async (req, res) => {
  //show error message in this object
  const errors = {};
  try {
    const { email, role, password } = req.body;
    const adminExists = await Admin.findOne({ email: email });
    if (adminExists) {
      errors.email = "Email Already Exist!";
      return res.json({ message: errors.email });
    }
    const newAdmin = new Admin({
      email,
      role,
      password,
    });
    const accessToken = jwt.sign(
      {
        userId: newAdmin._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.jwtExpire }
    );
    newAdmin.accessToken = accessToken;
    bcrypt.genSalt(10, (err, salted) => {
      if (!err) {
        bcrypt.hash(newAdmin.password, salted, (err, hash) => {
          newAdmin.password = hash;
          newAdmin.save().then((result) => {
            res.status(201).json({
              result,
              accessToken: `Bearer ${accessToken}`,
              message: "Admin Register is successful!",
            });
          });
        });
      } else {
        res.status(500).json({
          message: "Signup failed!!",
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Signup failed!",
    });
  }
};

//admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    Admin.findOne({ email })
      .then((admin) => {
        if (!admin) {
          return res.json({ status: "fail", email: "This email not found!" });
        }
        bcrypt.compare(password, admin.password, (err, data) => {
          if (!err) {
            if (data) {
              const payload = {
                adminId: admin._id,
                email: admin.email,
                password: admin.password,
                role: admin.role,
              };
              const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: process.env.jwtExpire,
              });

              return res.status(200).json({
                result: {
                  adminId: admin._id,
                  email: admin.email,
                  password: admin.password,
                  role: admin.role,
                },
                access_token: `Bearer ${token}`,
                status: "success",
                message: "Admin Login is successful!",
              });
            }
            return res.json({
              status: "fail",
              passMsg: "Password does not match",
            });
          }
        });
      })
      .catch((err) => serverError(res, err));
  } catch (err) {
    res.status(401).json({
      error: "Authentication failed!",
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  singleUser,
  getUserByEmail,
  deleteUser,
  updateUser,
  login,
  restricted,
  createAdmin,
  adminLogin,
};
