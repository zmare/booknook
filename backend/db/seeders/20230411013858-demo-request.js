'use strict';
//const { seedRequests } = require('../../utils/fakerSeed.js')
const { requests } = require('../../utils/request_data')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Requests';

    //let requests = seedRequests(5);

    return queryInterface.bulkInsert(options, requests, {})

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Requests';

    return queryInterface.bulkDelete(options, null, {})

  }
};
