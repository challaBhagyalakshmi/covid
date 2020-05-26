const csv = require("csv-parser");
const fs = require("fs");
const covid_info = require("../../db/Models/covid.js");

const Covid = covid_info.Covid;

async function export_data_csv_to_db_confirmed() {
  fs.createReadStream("../csv_files/confirmed.csv")
    .pipe(csv())
    .on("data", async (row) => {
      const country = await row.Country;
      let sum = 0;
      sum_of_confirm_cases_given_country(country, sum);
    })
    .on("end", () => {
      console.log("csv file is successfully processed");
    });
}

function update_recovered_cases_col(country, sum) {
  total_no_confirm_cases = 0;
  fs.createReadStream("../csv_files/confirmed.csv")
    .pipe(csv())
    .on("data", (row) => {
      const country_name = row.Country;
      const confirm_cases = row["5/18/20"];
      const confirmed_cases = parseInt(confirm_cases, 10);
      if (country.localeCompare(country_name) == 0) {
        sum = sum + confirmed_cases;
      }
    })
    .on("end", () => {
      console.log(country + " " + sum);
      Covid.sync().then(function () {
        Covid.update(
          { confirmed_cases: sum },
          {
            where: {
              country_name: country,
            },
          }
        );
      });
    });
}

module.exports = { export_data_csv_to_db_confirmed };
