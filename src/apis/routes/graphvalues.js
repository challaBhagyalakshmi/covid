const express = require("express");
const router = express.Router();
const covid = require("../../db/models/covid_info");
const conn = require("../../db/config/connection");
const Auth = require("../middlewares/auth");

const Covid = covid.Covid;
const sequelize = conn.sequelize;
const auth = Auth.auth;
const months = ["January", "February", "March", "April", "May", "June"];

router.get("/confirm", auth, async (req, res, next) => {
  let index = 0;
  const result = await sequelize
    .query(
      "select dates,sum(confirm_cases) as confirm_cases from covid_infos group by dates order by confirm_cases"
    )
    .then((data) => {
      return data[0];
    });
  res.write(
    JSON.stringify({
      status: "Success",
      Output: { data: "Confirmed_cases_month_wise" },
    })
  );
  result.map((data) => {
    res.write(
      JSON.stringify({
        Month: months[index],
        confirmed_cases: data.confirm_cases,
      })
    );
    index++;
  });
  res.end();
});

router.get("/recover", auth, async (req, res, next) => {
  let index = 0;
  const result = await sequelize
    .query(
      "select dates,sum(recover_cases) as recover_cases from covid_infos group by dates order by recover_cases"
    )
    .then((data) => {
      return data[0];
    });
  res.write(
    JSON.stringify({
      status: "Success",
      Output: { data: "Recovered_cases_month_wise" },
    })
  );
  result.map((data) => {
    res.write(
      JSON.stringify({
        Month: months[index],
        confirmed_cases: data.recover_cases,
      })
    );
    index++;
  });
  res.end();
});

router.get("/deaths", auth, async (req, res, next) => {
  let index = 0;
  const result = await sequelize
    .query(
      "select dates,sum(no_of_deaths) as no_of_deaths from covid_infos group by dates order by no_of_deaths"
    )
    .then((data) => {
      return data[0];
    });
  res.write(
    JSON.stringify({
      status: "Success",
      Output: { data: "no_of_deaths_month_wise" },
    })
  );
  result.map((data) => {
    res.write(
      JSON.stringify({
        Month: months[index],
        confirmed_cases: data.no_of_deaths,
      })
    );
    index++;
  });
  res.end();
});
module.exports = { router };
