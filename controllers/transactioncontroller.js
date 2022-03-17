const router = require('express').Router();
const { models } = require('../models');
let validateJWT = require('../middleware/validate-session');
let moment = require('moment')

router.post('profilecreate', validateJWT, async (req, res) => {
    const { transactionAmount, monthlysavings, yearlysavings, transactionDate } = req.body.transaction



    console.log(transactionDate)
    const result = await models.TransactionModel.create({
        transactionAmount: transactionAmount,
        monthlysavings: monthlysavings,
        yearlysavings: yearlysavings
    })

        .then(
            profile => {
                res.status(200).json({
                    message: `profile recieved ${result}`,
                    profile: profile
                })
            }
        )


})



router.get('/profile/:userId', validateJWT, async (req, res) => {
    const { userId } = req.params.userId
    try {
        const result = await models.TransactionModel.findOne({
            where: {
                userId: userId
            }
        })
            .then(
                transaction => {
                    res.status(200).json({
                        message: 'budget profile recieves',
                        transaction: transaction
                    })
                }
            )
    } catch (err) {
        res.status(401).json({
            message: 'user is not authorized to view create an account or login'
        })
    }
})




module.exports = router