const csv = require("csv-parser");
const fs = require("fs");
const covid_info = require("../../db/Models/covid.js");
const update_col_data = require("./upload");

const Covid = covid_info.Covid;

async function export_countries_data() {
  try {
    Covid.destroy({
      where: {},
      truncate: true,
    });
    fs.createReadStream("../csv_files/countries.csv")
      .pipe(csv())
      .on("data", async (row) => {
        const data = await Object.values(row);
        const dat = data[0];
        await Covid.sync()
          .then(function () {
            return Covid.create({
              country_name: dat,
              confirmed_cases: 0,
              recovered_cases: 0,
              no_of_deaths: 0,
            });
          })
          .then((data) => {
            console.log(data);
          });
      })
      .on("end", () => {
        console.log("csv file successfully processed");
      });
  } catch (error) {
    console.log(error);
  }
}

export_countries_data();
module.exports = { export_countries_data };
