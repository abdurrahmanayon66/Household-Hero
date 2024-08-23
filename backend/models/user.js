// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    age: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contactNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userImage: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [8, 100]
      }
    },
    notificationsSeenCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'users',
    timestamps: false
  });

  User.associate = (models) => {
    User.hasMany(models.Order, { foreignKey: 'userId', as: 'Orders' });
    User.hasMany(models.Notification, { foreignKey: 'userId', as: 'Notifications' });
    User.hasMany(models.Review, { foreignKey: 'userId', as: 'Reviews' });
  };

  return User;
};