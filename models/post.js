"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      text: DataTypes.STRING,
      name: DataTypes.STRING,
      avatar: DataTypes.STRING
    },
    {}
  );
  Post.associate = function(models) {
    models.Post.hasMany(models.Likes);
    models.Post.hasMany(models.Comment);
    models.Post.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Post;
};
