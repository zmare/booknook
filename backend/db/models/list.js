'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {

    static associate(models) {
      // define association here
      List.belongsTo(
        models.User, { foreignKey: 'ownerId' }
      )
      List.belongsToMany(
        models.Book, { through: "Books_Lists", foreignKey: 'listId' }
      )
    }
  }
  List.init({
    ownerId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};