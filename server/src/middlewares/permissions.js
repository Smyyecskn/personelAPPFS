"use strict";

module.exports = {
  isLogin: (req, res, next) => {
    // return next();
    if (req.user && req.user.isActive) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("Unauthorized");
    }
  },
  isLeadOrisAdmin: (req, res, next) => {
    // return next();
    if (
      req.user &&
      req.user.isActive &&
      (req.user.isLead || req.user.isAdmin)
    ) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("You should be a lead or an admin");
    }
  },

  isAdmin: (req, res, next) => {
    // return next();
    if (req.user && req.user.isActive && req.user.isAdmin) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("You should be an admin");
    }
  },
};
