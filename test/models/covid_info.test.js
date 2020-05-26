const request = require("supertest");
const covid = require("../../src/db/models/testdb/covid_info");
const csv = require("csv-parser");
const fs = require("fs");

const Covid = covid.Covid;

beforeEach(async function () {
  Covid.sync().then(async function () {
    Covid_info.destroy({
      where: {},
      truncate: true,
    });
  });
});
describe("Covid_info model ", async () => {
  test("it should insert a new record ", async () => {
    fs.createReadStream("../../src/data/csv_files/countries.csv")
      .pipe(csv())
      .on("data", async (row) => {
        const data = await Object.values(row);
        const dat = data[0];

        Covid.sync()
          .then(async function () {
            return Covid.create({
              country_name: dat,
              confirmed_cases: 0,
              recovered_cases: 0,
              no_of_deaths: 0,
            });
          })
          .then((data) => {
            expect(data.country_name).toBe(dat);
            expect(data.confirmed_cases).toBe(0);
            expect(data.no_of_deaths).toBe(0);
            expect(data.recovered_cases).toBe(0);
          });
      });
  }).on("end", () => {});
});
