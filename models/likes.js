"use strict";
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    "Likes",
    {
      likes: DataTypes.INTEGER
    },
    {}
  );
  Likes.associate = function(models) {
    models.Likes.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

    models.Likes.belongsTo(models.Post, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Likes;
};
