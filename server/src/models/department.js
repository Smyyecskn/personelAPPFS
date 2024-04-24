"use strict";

const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    collection: "departments",
  }
);

const Department = mongoose.model("Department", DepartmentSchema);
module.exports = Department;
