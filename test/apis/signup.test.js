const request = require("supertest");
const user = require("../../src/db/Models/testdb/user");
const App = require("../../src/server");
const bcrypt = require("bcrypt");

const User = user.User;
const App = App.app;

describe("Testcases for Signup ", async () => {
  beforeEach(async () => {
    await User.destroy({ where: {}, truncate: true });
  });

  test("it should create a new user ", async () => {
    const pwd = "pass123";
    const hashed = await bcrypt.hash(pwd, 8);
    request(app)
      .post("/user/signup")
      .send({
        name: "user1",
        email: "user1@gmail.com",
        pass: pwd,
      })
      .expect((res) => {
        expect(res.body.name).toBe("user1");
        expect(res.body.email).toBe("user1@gmail.com");
        expect(res.body.pass).toBe();
        expect(res.status).toBe(200);
      });
  });

  test("it should have bad request if request is invalid", async () => {
    const pwd = "pass222";
    const hashed = await bcrypt.hash(pwd, 8);
    request(app)
      .post("/user/signup")
      .send({
        name: "user2",
        email: "djkjdfdjf",
        pass: pwd,
      })
      .expect(400);
  });

  test("should not create a user if user is already existed ", async () => {
    const pwd = "pass333";
    request(app)
      .post("/user/signup")
      .send({
        name: "user1",
        email: "user1@gmail.com",
        pass: pwd,
      })
      .expect(403);
  });
});
