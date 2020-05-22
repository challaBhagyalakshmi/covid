const connection = require("../../config/testdbconn.js");
const Sequelize = require("sequelize");
const sequelize = connection.sequelize;

const country = sequelize.define("countries", {
  country_name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    unique: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    unique: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    unique: false,
  },
});

sequelize.sync();

module.exports = { country };
