"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    models.User.hasOne(models.Profile);
    models.User.hasOne(models.Likes);
    models.User.hasOne(models.Comment);
    models.User.hasMany(models.Post);
  };
  return User;
};
