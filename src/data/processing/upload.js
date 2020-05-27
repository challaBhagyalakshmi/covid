const confirm = require("./update_confirm_col");
const recover = require("./update_recovered_col");
const deaths = require("./update_deaths_col");

async function update_col_data() {
  await confirm.export_data_csv_to_db_confirmed();
  await recover.export_data_csv_to_db_recovered();
  await deaths.export_data_csv_to_db_deaths();
}

module.exports = { update_col_data };
