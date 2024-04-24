"use strict";

const router = require("express").Router();
const {
  list,
  read,
  create,
  update,
  delete: _delete,
} = require("../controllers/department");

// const { isAdmin } = require("../middlewares/permissions");

// router.use(isAdmin);
router.route("/").get(list).post(create);
router.route("/:id").get(read).put(update).patch(update).delete(_delete);

module.exports = router;
