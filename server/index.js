"Use strict";

const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const dbConnection = require("./src/configs/dbConnection");

app.use(express.json());
app.use(cors());

//! Database Connection
dbConnection();

//! Filter, Search, Sort, Pagination:
app.use(require("./src/middlewares/findSearchSortPage"));

//! Authentication
app.use(require("./src/middlewares/authentication"));

//! ENV Variables
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "http://127.0.0.1";

app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
    project: "Personnel App",
    author: "Omer Coskun",
    user: req.user,
  });
});

//! Routes
app.use(require("./src/routes"));

//! Error Handler
app.use(require("./src/middlewares/errorHandler"));
//!Server Listennig
app.listen(PORT, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});
