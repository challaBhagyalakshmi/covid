const request = require("supertest");
const country = require("../../src/db/models/testdb/countries.js");
const csv = require("csv-parser");
const fs = require("fs");

const Country = country.country;
beforeEach(async function () {
  Country.sync().then(async function () {
    Country.destroy({
      where: {},
      truncate: true,
    });
  });
});
describe("Coutries model ", async () => {
  test("it should insert a new record ", async () => {
    fs.createReadStream("../../src/data/csv_files/countries.csv")
      .pipe(csv())
      .on("data", async (row) => {
        const country = await row.Country;
        Country.sync()
          .then(async function () {
            return Country.create({
              country_name: country,
            });
          })
          .then((data) => {
            expect(data.country_name).toBe(country);
          });
      })
      .on("end", () => {});
  });
  test("sample test ", () => {
    expect(1).toBe(1);
  });
});
