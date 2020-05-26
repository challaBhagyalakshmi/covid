const express = require("express");
const router = express.Router();
const Sequelize = require("../../db/config/connection.js");
const Auth = require("../Middlewares/auth");
const auth = Auth.auth;
const sequelize = Sequelize.sequelize;

router.get("/top10", auth, async (req, res) => {
  try {
    sequelize
      .query(
        "select country_name,confirmed_cases from covid_infos order by confirmed_cases desc limit 10"
      )
      .then((data) => {
        res.send(data);
        res.status(200);
      });
  } catch (error) {
    res.send({ error: error.message });
    res.status(400);
  }
});

module.exports = { router };
