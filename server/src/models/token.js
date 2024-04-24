"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const mongoose = require("mongoose");
/* ------------------------------------------------------- *
{
  "userId": "65343222b67e9681f937f001",
  "token": "...tokenKey..."
}
/* ------------------------------------------------------- */
// Token Model:

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Personnel",
      required: true,
      index: true,
    },

    token: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },
  },
  { collection: "tokens", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Token", TokenSchema);
