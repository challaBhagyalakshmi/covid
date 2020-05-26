const Sequelize = require("sequelize");
const conn = require("../../config/testdbconn");

const sequelize = conn.sequelize;

const Covid = sequelize.define("covid_infos", {
  country_name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    defaultValue: null,
    primaryKey: false,
  },
  confirmed_cases: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: false,
    defaultValue: null,
    primaryKey: false,
  },
  recovered_cases: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: false,
    defaultValue: null,
    primaryKey: false,
  },
  no_of_deaths: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: false,
    defaultValue: null,
    primaryKey: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    unique: false,
    defaultValue: null,
    primaryKey: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    unique: false,
    defaultValue: null,
    primaryKey: false,
  },
});

sequelize.sync();

module.exports = { Covid };
