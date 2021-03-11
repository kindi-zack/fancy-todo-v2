'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title is Required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args : true,
          msg: 'Description is Requeired'
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,
          msg: 'Date Must be After Today'
        },
        notEmpty: {
          args: true,
          msg: 'Date is Required'
        },
        isDate: {
          args: true,
          msg: 'YY/MM/DD'
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};