const request = require("supertest");
const app = require("../../src/server");
const user = require("../../src/db/Models/testdb/user.js");

const User = user.User;
describe("Only admin can only insert the data into db ", async () => {
  beforeEach(async () => {
    User.destroy({ where: {}, truncate: true });
  });

  test("shoild upload the files ", () => {
    request(app)
      .post("/admin/upload")
      .send({
        email: "bhagya@gmail.com",
        pass: "covid2019",
      })
      .expect((res) => {
        expect(res.body).toBe("successfully uploaded the files");
        expect(res.status).toBe(200);
      });
  });
  test("it should rejects if user is not admin ", () => {
    request(app)
      .post("/admin/upload")
      .send({
        email: "user2@gmail.com",
        pass: "user234",
      })
      .expect((res) => {
        expect(res.body).toBe("You have no access to upload the files");
        expect(res.status).toBe(403);
      });
  });
});
