// models/helper.js
module.exports = (sequelize, DataTypes) => {
  const Helper = sequelize.define('Helper', {
    helperId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    feePerDay: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    feePerMonth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    helperImage: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gender: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    serviceType: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    serviceTitle: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    serviceDescription: {
      type: DataTypes.TEXT,
      allowNull: true
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
    }
  }, {
    tableName: 'helpers',
    timestamps: false
  });

  Helper.associate = (models) => {
    Helper.hasMany(models.Order, { foreignKey: 'helperId', as: 'Orders' });
    Helper.hasMany(models.Notification, { foreignKey: 'helperId', as: 'Notifications' });
    Helper.hasMany(models.Review, { foreignKey: 'helperId', as: 'Reviews' });
  };

  return Helper;
};