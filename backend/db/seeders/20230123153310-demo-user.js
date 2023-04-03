'use strict';
const bcrypt = require("bcryptjs");
const { query } = require("express");
const { seedUsers } = require('../../utils/fakerSeed.js')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';

    let users = seedUsers(20);
    users.push({
      name: 'Demo Lition',
      email: 'demo@user.io',
      hashedPassword: bcrypt.hashSync('password')
    });

    return queryInterface.bulkInsert(options, users, {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';

    return queryInterface.bulkDelete(options, null, {})
  }
};
