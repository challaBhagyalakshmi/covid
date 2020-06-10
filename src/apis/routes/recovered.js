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
        "select c.country_name,d.recover_cases from countries c,covid_infos d where dates=:value c.country_code=d.country_code order by recover_cases desc limit 10",
        { replacements: { value: "6/3/20" } }
      )
      .then((data) => {
        res.send({
          status: "Success",
          recovered_cases: data[0],
          no_of_records: data[1].rowCount,
        });
        res.status(200);
      });
  } catch (error) {
    res.send({ error: error.message });
    res.status(400);
  }
});

module.exports = { router };
