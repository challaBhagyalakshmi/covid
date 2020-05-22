const request = require("supertest");
const covid = require("../../src/db/models/testdb/covid_info");
const country = require("../../src/db/models/countries");
const csv = require("csv-parser");
const fs = require("fs");

const Covid_info = covid.Covid_info;
const Country = country.country;
beforeEach(async function () {
  Covid_info.sync().then(async function () {
    Covid_info.destroy({
      where: {},
      truncate: true,
    });
  });
});
describe("Coutries model ", async () => {
  test("it should insert a new record ", async () => {
    fs.createReadStream("../../src/data/csv_files/confirmed.csv")
      .pipe(csv())
      .on("data", async (row) => {
        const country = await row.Country;
        const confirm_case = await row["5/18/20"];
        Country.sync().then(async function () {
          Country.findAll({
            where: {
              country_name: country_name,
            },
          }).then((data) => {
            const country_code = data[0].id;
            Covid_info.sync()
              .then(async function () {
                return Covid_info.create({
                  confirmed_cases: country_name,
                  recovered_cases: 0,
                  no_of_deaths: 0,
                  country_code: country_code,
                });
              })
              .then((data) => {
                expect(data.confirmed_cases).toBe(confirm_case);
                expect(data.recovered_cases).toBe(0);
                expect(data.no_of_deaths).toBe(0);
                expect(data.country_code).toBe(country_code);
              });
          });
        });
      })
      .on("end", () => {});
  });
});
