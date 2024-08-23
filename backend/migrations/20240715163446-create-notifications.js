'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notifications', {
      notificationId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      helperId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'helpers',
          key: 'helperId'
        },
        onDelete: 'CASCADE'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'userId'
        },
        onDelete: 'CASCADE'
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'orderId'
        },
        onDelete: 'CASCADE'
      },
      notificationType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      seen: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('notifications');
  }
};
