const request = require("supertest");
const App = require("../../src/server");

const app = App.app;

describe("Top 10 countries who is having highest deaths in world", () => {
  test("it should return top 10 countries ", () => {
    const response = request(app)
      .get("/deaths/top10")
      .expect((res) => {
        expect(res.status).toBe(200);
        expect(res.no_of_records).toBe(10);
      });
  });
});
