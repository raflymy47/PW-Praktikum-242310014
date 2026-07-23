"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name cannot be empty",
          },
          len: {
            args: [3, 255],
            msg: "Name must be between 3 and 255 characters",
          },
        },
      },

      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Email format is invalid",
          },
          notEmpty: {
            msg: "Email cannot be empty",
          },
        },
      },

      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: {
            args: [6, 255],
            msg: "Password must be at least 6 characters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return User;
};