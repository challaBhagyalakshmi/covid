const fs = require("fs");
const csv = require("csv-parser");
const conn = require("../../db/config/connection");
const covid_info = require("../../db/Models/covid_info");
const country = require("../../db/Models/countries");

const sequelize = conn.sequelize;
const Covid_info = covid_info.Covid_info;
const Country = country.country;

async function export_data_csv_db() {
  Covid_info.destroy({
    where: {},
    truncate: true,
  });
  fs.createReadStream("../csv_files/confirmed.csv")
    .pipe(csv())
    .on("data", (row) => {
      const country = row.Country;
      Country.sync().then(function () {
        Country.findAll({
          where: {
            country_name: country,
          },
        }).then((data) => {
          const id_val = data[0].id;
          Covid_info.sync().then(async function () {
            Covid_info.create({
              confirmed_cases: row["5/18/20"],
              recovered_cases: 0,
              no_of_deaths: 0,
              country_code: id_val,
            });
          });
        });
      });
    })
    .on("end", () => {
      console.log("csv file is successfully processed!");
    });
}

async function get_first_id() {
  let val;
  await sequelize
    .query("select * from covid_infos order by id asc limit 1")
    .then((data) => {
      val = data[0][0].id;
    });
  return val;
}

async function update_data_in_db() {
  let id_value = await get_first_id();
  fs.createReadStream("../csv_files/recovered.csv")
    .pipe(csv())
    .on("data", async (row) => {
      try {
        const country = await row.Country;
        await sequelize
          .query("select * from countries where country_name=:value", {
            replacements: { value: country },
          })
          .then(async (data) => {
            const id_val = await data[0].id;
            Covid_info.sync().then(async function () {
              Covid_info.update(
                {
                  recovered_cases: row["5/18/20"],
                },
                {
                  where: {
                    country_code: id_val,
                    id: id_value,
                  },
                }
              );
              id_value++;
            });
          });
      } catch (error) {
        console.log(error);
      }
    })
    .on("end", () => {
      console.log("csv file is successfully uploaded! ");
    });
}

async function update_data_in_deaths_col() {
  let id_val = await get_first_id();
  console.log(id_val);
  fs.createReadStream("../csv_files/deaths.csv")
    .pipe(csv())
    .on("data", async (row) => {
      try {
        const country = await row.Country;
        Country.sync().then(async function () {
          await Country.findAll({
            where: {
              country_name: country,
            },
          }).then((data) => {
            const id_val = await data[0].id;
            Covid_info.sync().then(async function () {
              Covid_info.update(
                {
                  no_of_deaths: row["5/18/20"],
                },
                {
                  where: {
                    country_code: id_val,
                    id: id_value,
                  },
                }
              );
              id_value++;
            });
          });
        });
      } catch (error) {
        console.log(error);
      }
    })
    .on("end", () => {
      console.log("csv file is successfyllly processed!");
    });
}

async function main() {
  await update_data_in_deaths_col();
  await update_data_in_db();

}
async function upload() {
  await export_data_csv_db();
  await main();
}

module.exports = { upload };