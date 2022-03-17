const router = require('express').Router();
const { models } = require('../models');
let validateJWT = require('../middleware/validate-session');


router.post('/addexpense', validateJWT, async (req, res) => {
    const { expense, cost, categoryId, } = req.body.expense
    try {
        await models.ExpenseModel.create({
            expense: expense,
            cost: cost,
            categoryId: categoryId,
            userId: req.user.id
        })
            .then(
                expensecost => {
                    console.log(expensecost)
                    res.status(201).json({
                        expensecost: expensecost,
                        message: 'expense created successfully'
                    })
                }
            )
    } catch (err) {
        res.status(401).json({
            message: `user not authorized to add expense ${err}`,
        })
    }


})


module.exports = router