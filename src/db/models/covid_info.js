const Sequelize = require("sequelize");
const conn = require("../config/connection");
const country = require("./countries");

const Country = country.Country;
const sequelize = conn.sequelize;

const Covid = sequelize.define("covid_info", {
  confirm_cases: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    unique: false,
  },
  recover_cases: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    primaryKey: false,
    unique: false,
  },
  no_of_deaths: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    primaryKey: false,
    unique: false,
  },
  dates: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    unique: false,
  },
});

Country.hasMany(Covid, {
  foreignKey: "country_code",
  foreignKeyConstraint: true,
});
Covid.belongsTo(Country, { foreignKey: "country_code" });

Covid.sync();

module.exports = { Covid };
