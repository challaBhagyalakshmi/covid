const request = require("supertest");
const App = require("../../src/server");

const app = App.app;

describe("Top 10 countries who is having highest recovered cases in world", () => {
  test("it should return top 10 countries ", () => {
    const response = request(app)
      .get("/recovered/top10")
      .expect((res) => {
        expect(res.status).toBe(200);
      });
  });
});
