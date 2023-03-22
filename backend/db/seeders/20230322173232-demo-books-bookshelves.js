'use strict';
const { seedBooksBookshelves } = require('../../utils/fakerSeed.js')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Books_Bookshelves';

    let books = seedBooksBookshelves(20);

    return queryInterface.bulkInsert(options, books, {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Books_Bookshelves';

    return queryInterface.bulkDelete(options, null, {})
  }
};
