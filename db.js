const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
});

// const sequelize = new Sequelize("postgres://postgres:562613@localhost:5432/budgetwatch")



module.exports = sequelize