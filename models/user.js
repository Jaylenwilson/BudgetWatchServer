const { DataTypes } = require("sequelize")
const db = require('../db');
console.log(`db: ${db}`)
const Users = db.define("users", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

})

module.exports = Users