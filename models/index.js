const db = require('../db');

const TransactionModel = require('./transaction');
const ExpenseModel = require('./expense');
const UserModel = require('./user');
const CategoryModel = require('./category');
const Category = require('./category');

TransactionModel.hasMany(ExpenseModel);
ExpenseModel.belongsTo(TransactionModel);

CategoryModel.hasMany(ExpenseModel);
ExpenseModel.belongsTo(CategoryModel);

TransactionModel.belongsTo(UserModel);
UserModel.hasOne(TransactionModel);

CategoryModel.belongsTo(UserModel);
UserModel.hasMany(CategoryModel);


module.exports = {
    dbconnection: db,
    models: {
        UserModel,
        TransactionModel,
        ExpenseModel,
        CategoryModel
    }
}