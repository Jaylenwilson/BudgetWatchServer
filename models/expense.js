const { DataTypes, STRING, NUMBER, INTEGER, FLOAT } = require("sequelize")
const db = require("../db")
const Expense = db.define("expense", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },

    expense: {
        type: STRING,
        allowNull: false
    },

    cost: {
        type: FLOAT,
        allowNull: false
    }
})

module.exports = Expense