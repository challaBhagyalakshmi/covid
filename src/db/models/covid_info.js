const Sequelize = require("sequelize");
const conn = require("../config/connection");
const config = require("../config/config");
const country = require("./countries");
const csv = require("csv-parser");
const fs = require("fs");

const sequelize = conn.sequelize;
const Country = country.country;

const Covid_info = sequelize.define("covid_infos", {
  confirmed_cases: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: null,
    unique: false,
    primaryKey: false,
  },
  recovered_cases: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: null,
    unique: false,
    primaryKey: false,
  },
  no_of_deaths: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: null,
    unique: false,
    primaryKey: false,
  },
});

Country.hasMany(Covid_info, {
  foreignKey: "country_code",
  foreignKeyConstriant: true,
});
Covid_info.belongsTo(Country, { foreignKey: "country_code" });

Covid_info.sync();
module.exports = { Covid_info };
