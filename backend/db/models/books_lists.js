'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books_Lists extends Model {

    static associate(models) {
      // define association here
    }
  }
  Books_Lists.init({
    bookId: DataTypes.INTEGER,
    listId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Books_Lists',
  });
  return Books_Lists;
};