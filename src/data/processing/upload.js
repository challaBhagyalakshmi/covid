const covid = require("./covid_info");
const country = require("./countries");

async function upload_data() {
  await country.countries_data();
  await covid.upload();
}

module.exports = { upload_data };
