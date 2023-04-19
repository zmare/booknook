'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Request extends Model {

    static associate(models) {
      // define association here
      Request.belongsTo(
        models.User, { as: 'receiverId' }
      )

      Request.belongsTo(
        models.User, { as: 'requestorId' }
      )

    }
  }
  Request.init({
    requestorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        userShouldNotRequestSelf(value) {
          if (this.requestorId === this.receiverId) {
            throw Error("User cannot friend themself") // Use any custom error class if your application has such class.
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};