"use strict";

const router = require("express").Router();

router.use("/departments", require("./department"));
router.use("/auth", require("./auth"));
router.use("/tokens", require("./token"));
router.use("/personnels", require("./personnel"));

module.exports = router;
