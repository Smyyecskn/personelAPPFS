"use strict";

const Token = require("../models/token");
const Personnel = require("../models/personnel");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    const { username, password, email } = req.body;

    if ((username || email) && password) {
      const user = await Personnel.findOne({ $or: [{ username }, { email }] });

      if (user) {
        if (user.password === passwordEncrypt(password)) {
          const token = await Token.findOne({ userId: user._id });
          if (token) {
            res.status(200).send({
              error: false,
              data: user,
              token,
            });
          } else {
            const newToken = await Token.create({
              userId: user._id,
              token: `${user._id}${Date.now()}`,
            });
            res.status(201).send({
              error: false,
              data: user,
              token: newToken,
            });
          }
        } else {
          res.errorStatusCode = 404;
          throw new Error("Password is incorrect");
        }
      } else {
        res.errorStatusCode = 404;
        throw new Error("User not found");
      }
    } else {
      res.errorStatusCode = 400;
      throw new Error("Email or Username and Password fields are required");
    }
  },
  logout: async (req, res) => {
    const data = await Token.deleteOne({ userId: req.user?._id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
