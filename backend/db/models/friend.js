'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {

    static associate(models) {
      // define association here
      Friend.belongsTo(
        models.User, { foreignKey: 'userId' }
      )

      Friend.belongsTo(
        models.User, { foreignKey: 'friendId' }
      )

    }
  }
  Friend.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    friendId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        userShouldNotFollowSelf(value) {
          if (this.userId === this.friendId) {
            throw Error("User cannot friend themself") // Use any custom error class if your application has such class.
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Friend',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'friendId']
      }
    ]
  });
  return Friend;
};