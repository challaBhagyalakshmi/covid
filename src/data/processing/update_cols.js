const csv = require("csv-parser");
const fs = require("fs");
const dbconn = require("../../db/config/connection");
const covid = require("../../db/models/covid_info");
const countrym = require("../../db/models/countries");

const Covid = covid.Covid;
const Country = countrym.Country;
const sequelize = dbconn.sequelize;
const date = [
  months.jan,
  months.feb,
  months.march,
  months.april,
  months.may,
  months.june,
];

async function update_cols(filepath, file_num) {
  fs.createReadStream(filepath)
    .pipe(csv())
    .on("data", async (row) => {
      let date_val = [];
      date_val = date.map((ele) => {
        return row[ele];
      });
      const country = await row["Country/Region"];
      await sequelize
        .query("select * from countries where country_name=:value", {
          replacements: { value: country },
        })
        .then(async (data) => {
          const country_id = data[0][0].country_code;
          update_data(country_id, file_num, date_val);
        });
    })
    .on("end", () => {
      console.log("csv file is successfully processed");
    });
}

async function update_data(country_code, file_num, date_val) {
  let index = 0;
  arr.map(async (ele) => {
    const result = await add_value_col(country_code, ele, file_num);
    const no_of_cases = date_val[index++];
    const res = result + no_of_cases;
    Covid.sync().then(async function () {
      if (file_num == 0) {
        Covid.update(
          { confirm_cases: res },
          {
            where: {
              dates: ele,
              country_code: country_code,
            },
          }
        );
      } else if (file_num == 1) {
        Covid.update(
          { recover_cases: res },
          {
            where: {
              dates: ele,
              country_code: country_code,
            },
          }
        );
      } else {
        Covid.update(
          { no_of_deaths: res },
          {
            where: {
              dates: ele,
              country_code: country_code,
            },
          }
        );
      }
    });
  });
}

async function add_value_col(country_id, date, file_num) {
  const result = await sequelize
    .query(
      "select * from covid_infos where country_code=:value and dates=:value1",
      {
        replacements: { value: country_id, value1: date },
      }
    )
    .then(async (data) => {
      const res =
        file_num == 0
          ? data[0][0].confirm_cases
          : file_num == 1
          ? data[0][0].recover_cases
          : data[0][0].no_of_deaths;
      return res;
    });
  return result;
}

async function main() {
  await update_cols("../csv_files/recovered.csv", 1);
  await update_cols("../csv_files/deaths.csv", 2);
}

main();

module.exports = { update_cols, update_data };
