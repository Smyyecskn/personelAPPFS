"use strict";

const router = require("express").Router();
const {
  list,
  read,
  create,
  update,
  delete: _delete,
} = require("../controllers/personnel");

const {
  isAdmin,
  isLeadOrisAdmin,
  isLogin,
} = require("../middlewares/permissions");

router.route("/").get(isAdmin, list).post(isLeadOrisAdmin, create);
router
  .route("/:id")
  .get(isLogin, read)
  .put(isAdmin, update)
  .patch(isAdmin, update)
  .delete(isAdmin, _delete);

module.exports = router;
