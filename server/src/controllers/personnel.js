"use strict";

const Personnel = require("../models/personnel");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Personnel, {}, "departmentId");
    res.status(200).send({
      error: false,
      message: "Personnels Listed Successfully",
      details: await res.getModelListDetails(Personnel),
      data,
    });
  },

  create: async (req, res) => {
    req.body.isAdmin = false;
    req.body.isLead = false;

    let data;
    if (req.user.isAdmin) {
      data = await Personnel.create(req.body);
    }
    if (req.user.isLead && req.user.departmentId == req.body.departmentId) {
      data = await Personnel.create(req.body);
    } else {
      res.errorStatusCode = 403;
      throw new Error("Your departmentId is not correct");
    }
    res.status(201).send({
      error: false,
      message: "Personnel Created Successfully",
      data,
    });
  },
  read: async (req, res) => {
    const data = await Personnel.findOne({ _id: req.params.id }).populate(
      "departmentId"
    );

    res.status(200).send({
      error: false,
      message: "Personnel Read Successfully",
      data,
    });
  },
  update: async (req, res) => {
    delete req.body.isAdmin;
    delete req.body.isLead;

    let data;

    if (req.user.isAdmin) {
      data = await Personnel.updateOne({ _id: req.params.id }, req.body, {
        runValidators: true,
      });
    }
    if (req.user.isLead && req.user.departmentId == req.body.departmentId) {
      data = await Personnel.updateOne({ _id: req.params.id }, req.body, {
        runValidators: true,
      });
    } else {
      res.errorStatusCode = 403;
      throw new Error("Your departmentId is not correct");
    }

    res.status(202).send({
      error: false,
      message: "Personnel Updated Successfully",
      data,
      new: await Personnel.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    const data = await Personnel.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 201 : 404).send({
      error: !data.deletedCount,
      message: data.deletedCount
        ? "Personnel Deleted Successfully"
        : "Personnel Not Found",
      data,
    });
  },
};
