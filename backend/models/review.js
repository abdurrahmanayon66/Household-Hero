// models/review.js
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    reviewId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    helperId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'Reviews',
    timestamps: false
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
    Review.belongsTo(models.Helper, { foreignKey: 'helperId', as: 'Helper' });
  };

  return Review;
};