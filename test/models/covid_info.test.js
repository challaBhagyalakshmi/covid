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
    fs.createReadStream("../../src/data/csv_files/confirm.csv")
      .pipe(csv())
      .on("data", async (row) => {
        const data = await Object.values(row);
        const dat = data[0];

        Covid.sync()
          .then(async function () {
            return Covid.create({
              confirm_cases: dat,
              recover_cases: 0,
              no_of_deaths: 0,
              dates:'1/31/20'
            });
          })
          .then((data) => {
            expect(data.confirmed_cases).toBe(dat);
            expect(data.no_of_deaths).toBe(0);
            expect(data.recover_cases).toBe(0);
            expect(data.dates).toBe('1/31/10');
          });
      });
  }).on("end", () => {});
});
