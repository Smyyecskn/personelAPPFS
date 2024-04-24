"use stirct";

module.exports = (err, req, res, next) => {
  console.log("errorHandler worked.");
  res.status(res.errorStatusCode || 500).send({
    error: true,
    message: err.message,
    stack: err.stack,
    cause: err.cause,
  });
};
