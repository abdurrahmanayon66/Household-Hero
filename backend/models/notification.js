module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    notificationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    helperId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notificationType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'notifications',
    timestamps: true
  });

  Notification.associate = (models) => {
    Notification.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
    Notification.belongsTo(models.Order, { foreignKey: 'orderId', as: 'Order' });
    Notification.belongsTo(models.Helper, { foreignKey: 'helperId', as: 'Helper' });
  };

  return Notification;
};
