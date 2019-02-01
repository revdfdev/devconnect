"use strict";
module.exports = (sequelize, DataTypes) => {
  const Education = sequelize.define(
    "Education",
    {
      school: DataTypes.STRING,
      degree: DataTypes.STRING,
      fieldofstudy: DataTypes.STRING,
      from: DataTypes.DATE,
      to: DataTypes.DATE,
      current: DataTypes.BOOLEAN,
      description: DataTypes.STRING
    },
    {}
  );
  Education.associate = function(models) {
    models.Education.belongsTo(models.Profile, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Education;
};
