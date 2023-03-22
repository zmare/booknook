'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books_Bookshelves extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Books_Bookshelves.init({
    bookId: DataTypes.INTEGER,
    bookshelfId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Books_Bookshelves',
  });
  return Books_Bookshelves;
};