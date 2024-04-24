"use strict";

const router = require("express").Router();
const { login, logout } = require("../controllers/auth");

router.route("/login").post(login);
router.route("/logout").get(logout);

module.exports = router;
