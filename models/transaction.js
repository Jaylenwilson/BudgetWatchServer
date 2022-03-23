const { DataTypes, INTEGER, UUID, NUMBER, DATE } = require('sequelize')
const db = require('../db')
let moment = require('moment')

const Transaction = db.define("transaction", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },

    transactionAmount: {
        type: INTEGER,
        allowNull: false
    },

    monthlysavings: {
        type: INTEGER,
        allowNull: false
    },

    yearlysavings: {
        type: INTEGER,
        allowNull: false
    },

    transactionDate: {
        type: DataTypes.DATE,
        moment: moment().format("MMM Do YY")
    }

    // Date: {
    //     type: DATE,
    //     allowNull: false
    // },





    // monthlysaving: {
    //     type: Number,
    //     allowNull: false
    // },

    // yearlysaving: {
    //     type: Number,
    //     allowNull: false
    // }

})

module.exports = Transaction