'use strict';

const { query } = require('express');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      requestorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: 'cascade',
        allowNull: false
      },
      receiverId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: 'id'
        },
        onDelete: 'cascade',
        allowNull: false

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);

    // await queryInterface.addConstraint("Requests", {
    //   fields: ['requestorId', 'receiverId'],
    //   type: 'unique',
    //   name: 'unique_friend_requests'
    // }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Requests"
    // await queryInterface.removeConstraint(options, 'unique_friend_requests');
    await queryInterface.dropTable(options);
  }
};