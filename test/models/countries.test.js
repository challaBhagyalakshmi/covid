const request = require("supertest");
const country = require("../../src/db/models/testdb/countries");
const csv = require("csv-parser");
const fs = require("fs");

const Country = country.Country;

beforeEach(async function () {
  Country.sync().then(async function () {
    Country.destroy({
      where: {},
      truncate: true,
    });
  });
});
describe("Countries model ", async () => {
  test("it should insert a new record ", async () => {
    fs.createReadStream("../../src/data/csv_files/countries.csv")
      .pipe(csv())
      .on("data", async (row) => {
        const data = await Object.values(row);
        const dat = data[0];

        Country.sync()
          .then(async function () {
            return Country.create({
              country_name: dat,
            });
          })
          .then((data) => {
            expect(data.country_name).toBe(dat);
          });
      });
  }).on("end", () => {});
});
