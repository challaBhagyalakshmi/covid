const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const user = require("../../db/Models/user.js");
const upload = require("../../data/processing/covid_info");

const User = user.User;
router.post("/upload", async (req, res) => {
  try {
    const user = await findCredentials(req.body.email, req.body.pass);
    if (user) {
      if (user.admin == true) {
        upload.data_insertion_covid_info();
        res.send("successfully uploaded the files");
        res.status(200);
      } else {
        res.send("You have no access to upload the files");
        res.send(403);
      }
    }
  } catch (error) {
    res.send({ error: error.message });
    res.send(400);
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
      throw new Error("Invalid login!");
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

module.exports = { router };
