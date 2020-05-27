const csv = require("csv-parser");
const fs = require("fs");
const covid_info = require("../../db/Models/covid.js");
const update_data = require("./upload");

const Covid = covid_info.Covid;

async function export_countries_data() {
  try {
    await Covid.destroy({
      where: {},
      truncate: true,
    });
    await fs
      .createReadStream("../csv_files/countries.csv")
      .pipe(csv())
      .on("data", async function (row) {
        const country = await row.Country_name;
        const result = await data_insertion(country);
      })
      .on("end", async () => {
        console.log("csv file successfully processed");
        await update_data.update_col_data();
      });
  } catch (error) {
    console.log(error);
  }
}

async function data_insertion(country) {
  try {
    await Covid.sync()
      .then(function () {
        return Covid.create({
          country_name: country,
          confirmed_cases: 0,
          recovered_cases: 0,
          no_of_deaths: 0,
        });
      })
      .then((data) => {
        console.log(data);
      });
    return 1;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { export_countries_data };
