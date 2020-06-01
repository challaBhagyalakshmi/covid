const connection = require("../../src/db/config/testdbconn.js");
const user = require("../../src/db/Models/testdb/user.js");
const bcrypt = require("bcrypt");
const User = user.User;
const sequelize = connection.sequelize;

describe("User model ", async () => {
  beforeEach(async function () {
    await User.destroy({ where: {}, truncate: true });
  });

  test("inserting a new record ", async () => {
    const pwd = "pass456";
    const hashed = await bcrypt.hash(pwd, 8);
    sequelize
      .sync()
      .then(function () {
        return User.create({
          name: "user2",
          pass: hashed,
          email: "user2@gmail.com",
        });
      })
      .then((data) => {
        expect(data.name).toBe("user2");
        expect(data.pass).toBe(hashed);
        expect(data.email).toBe("user2@gmail.com");
        expect(data.admin).toBe(false);
      });
  });

  it("it should fail if give invalid email ", async () => {
    const user = {
      name: "user9",
      email: "user9jdjf",
      pwd: "user999",
    };
    const hashed = await bcrypt.hash(user.pwd, 8);
    sequelize.sync().then(function () {
      return user.create({
        name: user.name,
        email: user.email,
        pass: hashed,
      });
    });
  });
});
