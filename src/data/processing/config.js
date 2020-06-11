const dotenv = require("dotenv");
dotenv.config();

const dates = {
  jan: process.env.jan,
  feb: process.env.feb,
  march: process.env.march,
  april: process.env.april,
  may: process.env.may,
  june: process.env.june,
};

module.exports = { dates };
