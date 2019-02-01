"use strict";
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
    {
      handle: DataTypes.STRING,
      company: DataTypes.STRING,
      website: DataTypes.STRING,
      location: DataTypes.STRING,
      status: DataTypes.STRING,
      skill: DataTypes.ARRAY,
      bio: DataTypes.STRING,
      githubusername: DataTypes.STRING
    },
    {}
  );
  Profile.associate = function(models) {
    models.Profile.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Profile.hasMany(models.Experience);
    models.Profile.hasMany(models.Education);
    models.Profile.hasOne(models.Social);
  };
  return Profile;
};
