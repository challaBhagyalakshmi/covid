const dotenv = require("dotenv");
dotenv.config();

Credential = {
  dbname: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  testdb: process.env.TEST_DB,
  admin_pass: process.env.admin_pass,
  api_key: process.env.secret_key,
};

module.exports = { Credential };
