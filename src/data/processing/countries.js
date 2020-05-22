const csv = require("csv-parser");
const fs = require("fs");
const countries = require("../../db/Models/countries.js");

const Country = countries.country;

async function countries_data() {
  fs.createReadStream("../csv_files/countries.csv")
    .pipe(csv())
    .on("data", async (row) => {
      const data = await Object.values(row);
      const dat = data[0];
      Country.sync()
        .then(function () {
          return Country.create({
            country_name: dat,
          });
        })
        .then((data) => {
          console.log(data.country_name);
        });
    })
    .on("end", () => {
      console.log("csv file successfully processed");
    });
}

countries_data();
module.exports = { countries_data };
