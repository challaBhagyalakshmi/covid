const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();

const login = require("../routes/login.js");
const signup = require("../routes/signup.js");
const Admin = require("../routes/admin_upload");
const confirm = require("../routes/confirm");
const recover = require("../routes/recovered");
const deaths = require("../routes/deaths");

const Confirm = confirm.router;
const recover = recover.router;
const Deaths = deaths.router;
const Login = login.router;
const Signup = signup.router;
const admin = Admin.router;

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/confirmed", Confirm);
app.use("/recovered", Recover);
app.use("/deaths", Deaths);
app.use("/user", Signup);
app.use("/users", Login);
app.use("/admin", admin);
app.use(async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,DELETE");
  next();
});
app.use(async (req, res, next) => {
  const error = new Error("Not Found");
  res.status = 404;
  next(error);
});
app.use(async (error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: error.message,
  });
});

module.exports = app;
