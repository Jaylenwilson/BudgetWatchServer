const { DataTypes, STRING, NUMBER, INTEGER } = require("sequelize")
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
        type: INTEGER,
        allowNull: false
    }
})

module.exports = Expense