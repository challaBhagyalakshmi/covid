const Sequelize = require("sequelize");
const config = require("./config.js");
const credential = config.Credential;
const sequelize = new Sequelize(
  credential.dbname,
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

module.exports = { sequelize };
