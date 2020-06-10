const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const user = require("../../db/Models/user.js");

const User = user.User;
router.post("/login", async (req, res) => {
  try {
    const user = await findCredentials(req.body.email, req.body.pass);
    const token = await generatetoken(user);
    if (user == false) {
      throw new Error("Invalid Login!");
    }
    res.send({ user: user, token: token });
    res.status(200);
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

async function findCredentials(email, pass) {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return false;
    }
    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) {
      throw new Error("login failed");
    }
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function generatetoken(user) {
  try {
    const token = await jwt.sign({ id: user.id.toString() }, "covid19");
    return token;
  } catch (error) {
    console.log(error);
  }
}
module.exports = { router, findCredentials, generatetoken };
