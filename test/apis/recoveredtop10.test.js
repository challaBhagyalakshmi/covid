const request = require("supertest");
const app = require("../../src/api/Middlewares/app.js");

describe("Top 10 countries who is having highest recovered cases in world", () => {
  test("it should return top 10 countries ", () => {
    const response = request(app)
      .get("/recovered/top10")
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toBe([
          {
            country_name: "US",
            no_of_cases: 283178,
          },
          {
            country_name: "Germany",
            no_of_cases: 155041,
          },
          {
            country_name: "Spain",
            no_of_cases: 150376,
          },
          {
            country_name: "Italy",
            no_of_cases: 127326,
          },
          {
            country_name: "Turkey",
            no_of_cases: 111577,
          },
          {
            country_name: "Brazil",
            recovered_cases: 100459,
          },
          {
            country_name: "Iran",
            no_of_cases: 95661,
          },
          {
            country_name: "Russia",
            no_of_cases: 70209,
          },
          {
            country_name: "China",
            no_of_cases: 63616,
          },
          {
            country_name: "France",
            no_of_cases: 60416,
          },
        ]);
      });
  });
});
