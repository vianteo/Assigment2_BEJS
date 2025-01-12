const { DataTypes } = require('sequelize');
const { sequelize } = require('./database');

const Movie = sequelize.define('Movie', {
    title: { type: DataTypes.STRING, allowNull: false },
    synopsis: DataTypes.TEXT,
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    status: DataTypes.STRING
});

module.exports = Movie;