'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Anime.belongsTo(models.List, {foreignKey: 'list_id'})
    }
  }
  Anime.init({
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    synopsis: DataTypes.STRING,
    isWatched: DataTypes.BOOLEAN,
    rating: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Anime',
  });
  return Anime;
};