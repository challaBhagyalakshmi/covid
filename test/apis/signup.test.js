const request = require("supertest");
const user = require("../../src/db/Models/testdb/user");
const app = require("../../src/api/Middlewares/app");
const bcrypt = require("bcrypt");
const User = user.User;

describe("Testcases for Signup ", async () => {
  beforeEach(async () => {
    await User.destroy({ where: {}, truncate: true });
  });

  test("it should create a new user ", async () => {
    const pass = "pass123";
    const hashed = await bcrypt.hash(pass, 8);
    request(app)
      .post("/user/signup")
      .send({
        name: "user1",
        email: "user1@gmail.com",
        pass: hashed,
      })
      .expect((res) => {
        expect(res.body.name).toBe("user1");
        expect(res.body.email).toBe("user1@gmail.com");
        expect(res.body.pass).toBe(hashed);
        expect(res.status).toBe(200);
      });
  });

  test("it should have bad request if request is invalid", async () => {
    const pass = "pass222";
    const hashed = await bcrypt.hash(pass, 8);
    request(app)
      .post("/user/signup")
      .send({
        name: "user2",
        email: "djkjdfdjf",
        pass: hashed,
      })
      .expect(400);
  });

  test("should not create a user if user is already existed ", async () => {
    const pass = "pass333";
    const hashed = await bcrypt.hash(pass, 8);
    request(app)
      .post("/user/signup")
      .send({
        name: "user1",
        email: "user1@gmail.com",
        pass: hashed,
      })
      .expect(403);
  });
});
