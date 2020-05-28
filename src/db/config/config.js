const dotenv = require("dotenv");
dotenv.config();

Credential = {
  dbname: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  host: process.env.DB_HOST,
  testdb: process.env.TEST_DB,
};

module.exports = { Credential };
