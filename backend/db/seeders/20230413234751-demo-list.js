'use strict';

const { lists } = require('../../utils/list_data')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Lists';

    return queryInterface.bulkInsert(options, lists, {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Lists';

    return queryInterface.bulkDelete(options, null, {})
  }
};
