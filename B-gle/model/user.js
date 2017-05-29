const Sequelize = require('sequelize');
const config = require('../config/mysqlConfig');
const sequelize = new Sequelize(config.database,config.user, config.password, {host:config.host, port:config.port});

const User = sequelize.define('User', {
    beagle_id: {type:Sequelize.STRING, primaryKey:true },
    email: Sequelize.STRING,
    lastName: Sequelize.STRING,
    firstName: Sequelize.STRING,
    password: Sequelize.STRING
});


module.exports = User;