const request = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../../src/db/Models/testdb/user");

const User = user.User;
describe("Authenticating the user ", async () => {
  beforeEach(async () => {
    await User.destroy({ where: {}, truncate: true });
  });

  test("should login the user if existed ", async () => {
    await request(app)
      .post("/users/login")
      .send({
        email: "user1@gmail.com",
        pass: "pass111",
      })
      .expect(200);
  });

  it("should not login nonexistent user ", async () => {
    await request(app)
      .post("/users/login")
      .send({
        email: "user8@gmail.com",
        pass: "user9843",
      })
      .expect(400);
  });
});
