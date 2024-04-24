"use strict";

const Department = require("../models/department");

module.exports = {
  list: async (req, res) => {
    let customFilters = req.user?.isAdmin
      ? {}
      : { _id: req.user?.departmentId };
    const data = await res.getModelList(Department, customFilters);

    // console.log("data", data);
    res.status(200).send({
      error: false,
      message: "Departments Listed Successfully",
      details: await res.getModelListDetails(Department, customFilters),
      data,
    });
  },

  create: async (req, res) => {
    const data = await Department.create(req.body);
    res.status(201).send({
      error: false,
      message: "Department Created Successfully",
      data,
    });
  },
  read: async (req, res) => {
    let customFilters = req.user?.isAdmin
      ? { _id: req.params.id }
      : { _id: req.user.departmentId };
    const data = await Department.findOne(customFilters);

    res.status(200).send({
      error: false,
      message: "Department Read Successfully",
      data,
    });
  },
  update: async (req, res) => {
    const data = await Department.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      message: "Department Updated Successfully",
      data,
      new: await Department.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    const data = await Department.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 201 : 404).send({
      error: !data.deletedCount,
      message: data.deletedCount
        ? "Department Deleted Successfully"
        : "Department Not Found",
      data,
    });
  },
};
