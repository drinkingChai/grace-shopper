const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/graceshopper', { logging: false, operatorsAliases: false });

module.exports = conn;
