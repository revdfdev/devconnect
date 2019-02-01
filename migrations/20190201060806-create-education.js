"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Education", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      school: {
        type: Sequelize.STRING,
        allowNull: false
      },
      degree: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fieldofstudy: {
        type: Sequelize.STRING,
        allowNull: false
      },
      from: {
        type: Sequelize.DATE,
        allowNull: false
      },
      to: {
        type: Sequelize.DATE
      },
      current: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      ProfileId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: "Profiles",
          key: "id"
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Education");
  }
};
