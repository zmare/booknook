'use strict';
const { seedBookshelves } = require('../../utils/fakerSeed.js')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookshelves';

    let bookshelves = seedBookshelves(5);

    return queryInterface.bulkInsert(options, bookshelves, {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookshelves';

    return queryInterface.bulkDelete(options, null, {})
  }
};