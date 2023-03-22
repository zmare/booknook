'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      // define association here
      Book.hasMany(
        models.Review, { foreignKey: 'bookId', onDelete: 'cascade', hooks: true }
      )

      Book.belongsToMany(
        models.Bookshelf, { through: "Books_Bookshelves", foreignKey: 'bookId' }
      )

    }
  }
  Book.init({
    author: DataTypes.STRING,
    title: DataTypes.STRING,
    ISBN: DataTypes.STRING,
    summary: DataTypes.TEXT,
    bookImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};