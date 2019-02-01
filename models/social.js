"use strict";
module.exports = (sequelize, DataTypes) => {
  const Social = sequelize.define(
    "Social",
    {
      youtube: DataTypes.STRING,
      twitter: DataTypes.STRING,
      facebook: DataTypes.STRING,
      linkedin: DataTypes.STRING,
      instagram: DataTypes.STRING
    },
    {}
  );
  Social.associate = function(models) {
    models.Social.belongsTo(models.Profile, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Social;
};
