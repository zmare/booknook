'use strict';
const { seedBooks } = require('../../utils/fakerSeed.js')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Books';

    let books = seedBooks(20);

    return queryInterface.bulkInsert(options, books, {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Books';

    return queryInterface.bulkDelete(options, null, {})
  }
};
