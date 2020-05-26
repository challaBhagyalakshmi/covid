const country = require("./countries");
const confirm = require("./update_confirm_col");
const recover = require("./update_recovered_col");
const deaths = require("./update_deaths_col");

async function upload_data() {
  await country.export_countries_data();
}

async function update_data() {
  await confirm.export_data_csv_to_db_confirmed();
  await recover.export_data_csv_to_db_recovered();
  await deaths.export_data_csv_to_db_deaths();
}

upload_data();
module.exports = { upload_data, update_data };
