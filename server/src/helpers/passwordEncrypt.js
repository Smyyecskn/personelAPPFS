"use strict";

const crypto = require("node:crypto");
const keyCode =
  process.env?.SECRET_KEY || "sşdkfşqwkfsşdvcerogkşo306ık2şfkewşkfsd";
const loopCount = 10_000; // 10K
const charCount = 32; // write 32 for 64
const encType = "sha512";

module.exports = function (password) {
  return crypto
    .pbkdf2Sync(password, keyCode, loopCount, charCount, encType)
    .toString("hex");
};
