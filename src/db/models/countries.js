const Sequelize = require("sequelize");
const conn = require("../config/connection");

const sequelize = conn.sequelize;
const Country = sequelize.define("countries", {
  country_name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    unique: true,
  },
  country_code: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: false,
    primaryKey: true,
    autoIncrement: true,
  },
});

Country.sync();

module.exports = { Country };
