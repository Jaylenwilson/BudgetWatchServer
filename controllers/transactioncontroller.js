const router = require('express').Router();
const { models } = require('../models');
let validateJWT = require('../middleware/validate-session');

router.post('/profilecreate', validateJWT, async (req, res) => {
    const { transactionAmount, monthlysavings, yearlysavings } = req.body.transaction

    let moment = require('moment')
    const creationDate = moment().format("MMM Do YYYY")
    const resetDateM = moment().add('1', 'M')
    const resetDateY = moment().add('1', 'y')

    // resetDate.format("MMM Do YY")
    try {
        await models.TransactionModel.create({
            transactionAmount: transactionAmount,
            monthlysavings: monthlysavings,
            yearlysavings: yearlysavings,
            userId: req.user.id,
            // moment: moment().format("MMM fo YY")
            // Date: Date
        })

            .then(
                profile => {
                    res.status(200).json({
                        message: `budget profile created`,
                        profile: profile,
                        creationDate: creationDate,
                        resetDateM: resetDateM.format("MMM Do YYYY"),
                        resetDateY: resetDateY.format("MMM Do YYYY")
                    })
                },
                profileReset()
            )


    } catch (err) {
        res.status(404).json({
            message: `profile not created ${err}`
        })
    }

    // ? what will I need to manipulate here will I be able to manipulate or make variables that will be able to be manipulated on client side 
    // ? will I have hoisting issues when calling this function above before is is declared
    function profileReset() {
        if (creationDate === resetDateM) {
            return transactionAmount
        }
        if (yearlysavings == yearlysavings) {
            return "You have Reached your yearly savings Goal!!"
        }
    }

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