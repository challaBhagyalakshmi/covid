const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const connection = require("../../db/config/connection.js");
const users = require("../../db/Models/user.js");

const sequelize = connection.sequelize;
const User = users.User;

router.post("/signup", async (req, res) => {
  try {
    const pwd = await req.body.pass;
    const hashed = await bcrypt.hash(pwd, 8);
    const user = await findUser(req.body.email);
    if (user) {
      res.send({ message: "user is already registered!" });
      res.status(403);
    } else {
      sequelize
        .sync()
        .then(function () {
          return User.create({
            name: req.body.username,
            pass: hashed,
            email: req.body.email,
          });
        })
        .then((data) => {
          res.status(201);
          res.send({ name: data.name, email: data.email, pass: data.pass });
        });
    }
  } catch (error) {
    res.send({ error: error.message });
    res.status(400);
  }
});

async function findUser(email) {
  try {
    const user = User.findOne({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
}
module.exports = { router };
