const router = require('express').Router();
const { models } = require('../models');
let validateJWT = require('../middleware/validate-session');


router.post('/addexpense', validateJWT, async (req, res) => {
    const { expense, cost } = req.body.expense
    try {
        await models.ExpenseModel.create({
            expense: expense,
            cost: cost
        })
            .then(
                expensecost => {
                    console.log(expensecost)
                    res.status(201).json({
                        expense: expense,
                        cost: cost,
                        message: 'expense created successfully'
                    })
                }
            )
    } catch (err) {

    }
})


module.exports = router