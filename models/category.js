

const { DataTypes, STRING } = require("sequelize")
const db = require('../db')
const Category = db.define('category', {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },

    category: {
        type: STRING,
        allowNull: false
    }
})

module.exports = Category