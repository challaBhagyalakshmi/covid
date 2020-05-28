const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 2020;

const config = require("./db/config/config");
const login = require("./apis/routes/login.js");
const signup = require("./apis/routes/signup.js");
const Admin = require("./apis/routes/admin_upload");
const confirm = require("./apis/routes/confirm");
const recover = require("./apis/routes/recovered");
const deaths = require("./apis/routes/deaths");

const Confirm = confirm.router;
const Recover = recover.router;
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

app.listen(port, () => {
  console.log("Server starts running on port 2019 ...");
  console.log(port);
});
