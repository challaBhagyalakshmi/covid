const request = require("supertest");
const App = require("../../src/server");
const bcrypt = require("bcrypt");
const user = require("../../src/db/Models/testdb/user.js");

const User = user.User;
const app = App.app;

describe("Only admin can only insert the data into db ", async () => {
  beforeEach(async () => {
    User.destroy({ where: {}, truncate: true });
  });
  test("it should create a new user ", async () => {
    const pwd = "covid19";
    const hashed = await bcrypt.hash(pwd, 8);
    User.sync()
      .then(function () {
        return User.create({
          name: "bhagya",
          email: "bhagya@gmail.com",
          pass: hashed,
          admin: true,
        });
      })
      .then((data) => {
        expect(data.name).toBe("bhagya");
        expect(data.email).toBe("bhagya@gmail.com");
        expect(data.pass).toBe(hashed);
        expect(data.admin).toBe(true);
      });
  });
  test("should upload the files ", async () => {
    const pwd = "covid19";
    const hashed = await bcrypt.hash(pwd, 8);
    request(app)
      .post("/admin/upload")
      .send({
        email: "bhagya@gmail.com",
        pass: pwd,
      })
      .expect((res) => {
        expect(res.body).toBe("successfully uploaded the files");
        expect(res.status).toBe(200);
      });
  });
  test("it should rejects if user is not admin ", async () => {
    const pwd = "user234";
    request(app)
      .post("/admin/upload")
      .send({
        email: "user2@gmail.com",
        pass: pwd,
      })
      .expect((res) => {
        expect(res.body).toBe("You have no access to upload the files");
        expect(res.status).toBe(403);
      });
  });
});
