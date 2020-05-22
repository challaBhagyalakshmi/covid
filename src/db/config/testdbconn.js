const Sequelize = require("sequelize");
const config = require("./config.js");

const credential = config.Credential;

const sequelize = new Sequelize(
  credential.testdb,
  credential.user,
  credential.pass,
  {
    host: credential.host,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(function () {
    console.log("database connection is established!");
    console.log(credential.testdb);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = { sequelize };
