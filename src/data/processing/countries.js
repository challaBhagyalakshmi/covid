const fs = require("fs");
const csv = require("csv-parser");
const country = require("../../db/models/countries");

const path = "../csv_files/countries.csv";
const Country = country.Country;

async function export_data_countries_table() {
  fs.createReadStream(path)
    .pipe(csv())
    .on("data", (row) => {
      const country = row.Country_name;
      Country.sync()
        .then(function () {
          return Country.create({
            country_name: country,
          });
        })
        .then((data) => {
          console.log(data.country_code);
        });
    })
    .on("end", () => {
      console.log("csv file is successfully processed");
    });
}

export_data_countries_table();

module.exports = { export_data_countries_table };
