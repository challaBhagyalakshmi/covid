const request = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const App = require("../../src/server");
const login = require("../../src/apis/routes/login");
const user = require("../../src/db/Models/testdb/user");

const User = user.User;
const app = App.app;

describe("Authenticating the user ", async () => {
  beforeEach(async () => {
    await User.destroy({ where: {}, truncate: true });
  });
  test("it should create a new user ", async () => {
    const pwd = "pass111";
    const hashed = await bcrypt.hash(pwd, 8);
    User.sync()
      .then(function () {
        return User.create({
          name: "user1",
          pass: hashed,
          email: "user1@gmail.com",
        });
      })
      .then((data) => {
        expect(data.name).toBe("user1");
        expect(data.email).toBe("user1@gmail.com");
        expect(data.pass).toBe(hashed);
      });
  });
  test("should login the user if existed ", async () => {
    const email = "user1@gmail.com";
    const pwd = "pass111";
    const hashed = await bcrypt.hash(pwd, 8);
    const user = await login.findCredentials(email, pwd);
    const jwt_token = await login.generatetoken(user);
    console.log(jwt_token);
    await request(app)
      .post("/users/login")
      .send({
        email: "user1@gmail.com",
        pass: pwd,
      })
      .then((res) => {
        expect(res.body.user.email).toBe(email);
        //expect(res.body.user.pass).toBe(hashed);
        expect(res.body.token).toBe(jwt_token);
        expect(res.status).toBe(200);
      });
  });

  it("should not login nonexistent user ", async () => {
    const pwd = "user9843";
    const hashed = await bcrypt.hash(pwd, 8);
    await request(app)
      .post("/users/login")
      .send({
        email: "user8@gmail.com",
        pass: pwd,
      })
      .expect(401);
  });
});
