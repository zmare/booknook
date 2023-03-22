'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books_Bookshelves', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Books" },
        onDelete: "CASCADE"
      },
      bookshelfId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Bookshelves" },
        onDelete: "CASCADE"
      }
      // createdAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE,
      //   defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE,
      //   defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      // }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Books_Bookshelves'
    await queryInterface.dropTable(options);
  }
};