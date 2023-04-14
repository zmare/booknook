'use strict';
const { seedBooksLists } = require('../../utils/fakerSeed.js')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Books_Lists';

    let books_lists = seedBooksLists(10);

    return queryInterface.bulkInsert(options, books_lists, {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Books_Lists';

    return queryInterface.bulkDelete(options, null, {})
  }
};
