const csv = require("csv-parser");
const fs = require("fs");
const covid_info = require("../../db/Models/covid.js");

const Covid = covid_info.Covid;

async function export_data_csv_to_db_deaths() {
  fs.createReadStream("../csv_files/deaths.csv")
    .pipe(csv())
    .on("data", async (row) => {
      const country = await row.Country;
      let sum = 0;
      update_deaths_cases_col(country, sum);
    })
    .on("end", () => {
      console.log("csv file is successfully processed");
    });
}

function update_deaths_cases_col(country, sum) {
  total_no_confirm_cases = 0;
  fs.createReadStream("../csv_files/deaths.csv")
    .pipe(csv())
    .on("data", (row) => {
      const country_name = row.Country;
      const deaths = row["5/18/20"];
      const no_of_deaths = parseInt(deaths, 10);
      if (country.localeCompare(country_name) == 0) {
        sum = sum + no_of_deaths;
      }
    })
    .on("end", () => {
      console.log(country + " " + sum);
      Covid.sync().then(function () {
        Covid.update(
          { no_of_deaths: sum },
          {
            where: {
              country_name: country,
            },
          }
        );
      });
    });
}

module.exports = { export_data_csv_to_db_deaths };
