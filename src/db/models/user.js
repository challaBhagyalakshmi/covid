const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const connection = require("../config/connection.js");
const sequelize = connection.sequelize;

const User = sequelize.define("users", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    unique: false,
  },
  pass: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    unique: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: null,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  admin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    primaryKey: false,
    unique: false,
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

module.exports = { User };
