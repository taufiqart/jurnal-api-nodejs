const mongoose = require("mongoose");
const User = require("../models/User.model");

module.exports = {
  getAllUsers: async (req, res, next) => {
    mongoose;
    res.send();
  },
  getUserById: async (req, res, next) => {
    let user = await User.findOne({ _id: req.params.id });
    let data = {
      data: user,
      token: req.token,
    };
    res.json(data);
  },
};
