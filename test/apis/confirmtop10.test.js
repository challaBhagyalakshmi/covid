const request = require("supertest");
const App = require("../../src/server.js");

const app = App.app;

describe("This is for top10 countries of covid confirm_cases");
test("it should return top 10 countries who is having more confirmed cases", () => {
  request(app)
    .get("/confirmed/top10")
    .expect((res) => {
      expect(res.no_of_records).toBe(10);
      expect(res.status).toBe(200);
    });
});
