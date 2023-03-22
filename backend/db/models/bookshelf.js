'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookshelf extends Model {

    static associate(models) {
      // define association here
      Bookshelf.belongsTo(
        models.User, { foreignKey: 'ownerId' }
      )
      Bookshelf.belongsToMany(
        models.Book, { through: "Books_Bookshelves", foreignKey: 'bookshelfId' }
      )
    }
  }
  Bookshelf.init({
    ownerId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bookshelf',
  });
  return Bookshelf;
};