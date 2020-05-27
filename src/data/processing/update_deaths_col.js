const csv = require("csv-parser");
const fs = require("fs");
const covid_info = require("../../db/Models/covid.js");

const Covid = covid_info.Covid;

async function export_data_csv_to_db_deaths() {
  try {
    fs.createReadStream("../csv_files/deaths.csv")
      .pipe(csv())
      .on("data", async (row) => {
        const country = await row.Country;
        let sum = 0;
        const res = await update_deaths_cases_col(country, sum);
      })
      .on("end", () => {
        console.log("csv file is successfully processed");
      });
  } catch (error) {
    console.log(error);
  }
}

async function update_deaths_cases_col(country, sum) {
  try {
    fs.createReadStream("../csv_files/deaths.csv")
      .pipe(csv())
      .on("data", async (row) => {
        const country_name = row.Country;
        const deaths = row["5/18/20"];
        const no_of_deaths = parseInt(deaths, 10);
        if (country.localeCompare(country_name) == 0) {
          sum = sum + no_of_deaths;
        }
      })
      .on("end", async () => {
        console.log(country + " " + sum);
        await Covid.sync().then(async function () {
          await Covid.update(
            { no_of_deaths: sum },
            {
              where: {
                country_name: country,
              },
            }
          );
        });
      });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { export_data_csv_to_db_deaths };
