'use strict';
const { seedFriends } = require('../../utils/fakerSeed.js')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Friends';

    let friends = seedFriends(8);

    return queryInterface.bulkInsert(options, friends, {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Friends';

    return queryInterface.bulkDelete(options, null, {})
  }
};
