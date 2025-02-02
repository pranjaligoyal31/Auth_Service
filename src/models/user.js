'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');

const { SAlT } = require('../config/serverConfig');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {
        through: 'User_Roles'
      })
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate: {    //to check whether the user is putting valid email,,like putting gmail.com otherwise it will give error
        isEmail: true
      }
    },
    password: {
      type:DataTypes.STRING,
       allowNull: false,
       validate: {
        len: [3,300]
       }
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  //for encrypting the passsword..that means we can't store the raw password of the user..so we have to encrypt it
  User.beforeCreate((user) => {
    const encryptedPassword = bcrypt.hashSync(user.password,SALT);
    user.password = encryptedPassword;
  });
  return User;
};