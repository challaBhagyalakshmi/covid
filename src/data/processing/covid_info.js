const fs = require("fs");
const csv = require("csv-parser");
const dbconn = require("../../db/config/connection");
const covid = require("../../db/models/covid_info");
const country = require("../../db/models/countries");
const update_col_data = require("./update_cols");

const Covid = covid.Covid;
const Country = country.Country;
const sequelize = dbconn.sequelize;
const filepath = "../csv_files/confirm.csv";

async function data_insertion_covid_info() {
  Covid.destroy({ truncate: true }, { where: {} });
  fs.createReadStream("../csv_files/confirm.csv")
    .pipe(csv())
    .on("data", (row) => {
      const arr = [
        "1/31/20",
        "2/29/20",
        "3/31/20",
        "4/30/20",
        "5/31/20",
        "6/3/20",
      ];
      let date_val = [];
      date_val = arr.map((ele) => {
        return row[ele];
      });
      const country = row["Country/Region"];
      sequelize
        .query("select country_code from countries where country_name=:value", {
          replacements: { value: country },
        })
        .then(async (data) => {
          const country_id = data[0][0].country_code;
          const record = await Covid.findOne({
            where: {
              country_code: country_id,
            },
          });
          if (!record) {
            await sequelize.sync().then(async function () {
              return Covid.bulkCreate([
                {
                  country_code: country_id,
                  dates: "1/31/20",
                  confirm_cases: row["1/31/20"],
                  recover_cases: 0,
                  no_of_deaths: 0,
                },
                {
                  country_code: country_id,
                  dates: "2/29/20",
                  confirm_cases: row["2/29/20"],
                  recover_cases: 0,
                  no_of_deaths: 0,
                },
                {
                  country_code: country_id,
                  dates: "3/31/20",
                  confirm_cases: row["3/31/20"],
                  recover_cases: 0,
                  no_of_deaths: 0,
                },
                {
                  country_code: country_id,
                  dates: "4/30/20",
                  confirm_cases: row["4/30/20"],
                  recover_cases: 0,
                  no_of_deaths: 0,
                },
                {
                  country_code: country_id,
                  dates: "5/31/20",
                  confirm_cases: row["5/31/20"],
                  recover_cases: 0,
                  no_of_deaths: 0,
                },
                {
                  country_code: country_id,
                  dates: "6/3/20",
                  confirm_cases: row["6/3/20"],
                  recover_cases: 0,
                  no_of_deaths: 0,
                },
              ]);
            });
          } else {
            const result = update_col_data.update_data(
              country_code,
              0,
              date_val
            );
            console.log(result);
          }
        });
    })
    .on("end", () => {
      console.log("csv file is successfully processed!");
      update_col_data.main();
    });
}

module.exports = { data_insertion_covid_info };
