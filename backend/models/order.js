module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    orderId: {
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
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    contractType: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    frequency: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    workingDays: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    bill: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  }, {
    tableName: 'Orders',
    timestamps: true
  });

  Order.associate = (models) => {
    Order.belongsTo(models.Helper, { foreignKey: 'helperId', as: 'Helper' });
    Order.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
    Order.hasMany(models.Notification, { foreignKey: 'orderId', as: 'Notifications' });
  };

  return Order;
};
