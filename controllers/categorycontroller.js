const router = require('express').Router();
const { models } = require('../models');
let validateJWT = require('../middleware/validate-session');

// fetch to load all categories of a user automatically loads on the page 
router.get('/categoryview/:userId', validateJWT, async (req, res) => {
    const userId = req.params.userId


    try {
        await models.CategoryModel.findAll({
            where: {
                userId: userId
            },


            include: [
                {
                    model: models.ExpenseModel
                }
            ]
        })
            .then(
                category => {
                    res.status(200).json({
                        message: `categories recieved `,
                        category: category
                    })
                }
            )
    } catch (err) {
        res.status(401).json({
            message: `user is not authorized to view this content create an account or login ${err} `
        })

    }
})







// will be a button to add a category
router.post('/category', validateJWT, async (req, res) => {
    const { category } = req.body.category;

    try {
        await models.CategoryModel.create({
            category: category,
            userId: req.user.id,
            include: [
                {
                    model: models.ExpenseModel
                }
            ]
        })
            .then(
                category => {
                    console.log(category)
                    res.status(201).json({
                        category: category,
                        message: 'category created'
                    });
                }
            )
    } catch (err) {
        res.status(401).json({
            message: "user is not authorized to create category try logging in"
        })

        res.status(502).json({
            message: "invalid response"
        })


    }
})

module.exports = router