const request = require("supertest");
const app = require("../../src/api/Middlewares/app.js");

describe("Top 10 countries who is having highest deaths in world", () => {
  test("it should return top 10 countries ", () => {
    const response = request(app)
      .get("/deaths/top10")
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toBe([
          {
            country_name: "US",
            no_of_deaths: 90347,
          },
          {
            country_name: "United Kingdom",
            no_of_deaths: 34796,
          },
          {
            country_name: "Italy",
            no_of_deaths: 32007,
          },
          {
            country_name: "France",
            nno_of_deaths: 28193,
          },
          {
            country_name: "Spain",
            no_of_deaths: 27709,
          },

          {
            country_name: "Brazil",
            no_of_deaths: 16853,
          },
          {
            country_name: "Belgium",
            nno_of_deaths: 9080,
          },
          {
            country_name: "Germany",
            no_of_deaths: 8003,
          },
          {
            country_name: "Iran",
            no_of_deaths: 7057,
          },
          {
            country_name: "Mexico",
            no_of_deaths: 5332,
          },
        ]);
      });
  });
});
