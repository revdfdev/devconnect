"use strict";
module.exports = (sequelize, DataTypes) => {
  const Experience = sequelize.define(
    "Experience",
    {
      title: DataTypes.STRING,
      company: DataTypes.STRING,
      location: DataTypes.STRING,
      from: DataTypes.DATE,
      to: DataTypes.DATE,
      current: DataTypes.BOOLEAN,
      description: DataTypes.STRING
    },
    {}
  );
  Experience.associate = function(models) {
    models.Experience.belongsTo(models.Profile, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Experience;
};
