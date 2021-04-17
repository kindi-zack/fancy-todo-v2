'use strict';
const {hashPass} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email is Required'
        },
        isEmail: {
          args: true,
          msg: 'Must use email format'
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is Required'
        }
      },
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, option){
        user.password = hashPass(user.password)
      }
    }
  });
  return User;
};