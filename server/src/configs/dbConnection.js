"use strict";

const mongoose = require("mongoose");
const MONGODB = process.env.MONGODB;

module.exports = function () {
  mongoose
    .connect(MONGODB)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch(() => {
      console.log("Could not connect to MongoDB");
    });
};
