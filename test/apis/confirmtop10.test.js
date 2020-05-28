const request = require("supertest");
const app = require("../../src/server");

describe("This is for top10 countries of covid confirm_cases");
test("it should return top 10 countries who is having more confirmed cases", () => {
  request(app)
    .get("/confirmed/top10")
    .expect((res) => {
      expect(res.body).toBe([
        {
          country_name: "US",
          confirmed_cases: 1508308,
        },
        {
          country_name: "Russia",
          confirmed_cases: 290678,
        },
        {
          country_name: "Brazil",
          confirmed_cases: 255368,
        },
        {
          country_name: "United Kingdom",
          confirmed_cases: 246406,
        },
        {
          country_name: "Spain",
          confirmed_cases: 231606,
        },
        {
          country_name: "Italy",
          confirmed_cases: 225886,
        },
        {
          country_name: "France",
          confirmed_cases: 177554,
        },
        {
          country_name: "Germany",
          confirmed_cases: 176551,
        },
        {
          country_name: "Turkey",
          confirmed_cases: 150593,
        },
        {
          country_name: "Iran",
          confirmed_cases: 122492,
        },
      ]);
      expect(res.status).toBe(200);
    });
});
