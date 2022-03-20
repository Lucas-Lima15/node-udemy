const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'root', 'next1511', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;