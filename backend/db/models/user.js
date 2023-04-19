'use strict';
const { Model, Validator, DatabaseError } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, name, email } = this; // context will be the User instance
      return { id, name, email };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          email: credential
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id, {
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        });
      }
    }
    static async signup({ name, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);

      const user = await User.create({
        name,
        email,
        hashedPassword
      });

      return await User.scope('currentUser').findByPk(user.id, {
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });
    }
    static associate(models) {
      // define association here
      User.hasMany(
        models.Review, { foreignKey: 'ownerId', onDelete: 'cascade', hooks: true }
      )

      User.hasMany(
        models.Bookshelf, { foreignKey: 'ownerId', onDelete: 'cascade', hooks: true }
      )

      User.hasMany(
        models.Request, { foreignKey: 'receiverId', onDelete: 'cascade', hooks: true }
      )

      User.hasMany(
        models.Request, { foreignKey: 'requestorId', onDelete: 'cascade', hooks: true }
      )

      User.hasMany(
        models.Friend, { foreignKey: 'userId', onDelete: 'cascade', hooks: true }
      )

      User.hasMany(
        models.Friend, { foreignKey: 'friendId', onDelete: 'cascade', hooks: true }
      )

      User.hasMany(
        models.List, { foreignKey: 'ownerId', onDelete: 'cascade', hooks: true }
      )
    }
  };
  User.init(
    {
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  return User;
};
