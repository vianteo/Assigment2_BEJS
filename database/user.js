const { DataTypes } = require('sequelize');
const { sequelize } = require('./database');

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
});

module.exports = User;