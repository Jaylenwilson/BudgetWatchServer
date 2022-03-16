const router = require('express').Router();
const { models } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const { Op } = require("sequelize");
const validateJWT = require('../middleware/validate-session');

router.post('/register', async (req, res) => {
    const { email, password } = req.body.users;
    try {
        await models.UserModel.create({
            email: email,
            password: bcrypt.hashSync(password, 10),
        })
            .then(
                user => {
                    console.log(user)
                    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

                    // user.addRoleModel('b7dafbeb-4853-4991-ad87-65b70c69cd5d').then(a => { });

                    res.status(201).json({
                        user: user,
                        message: 'user created',
                        sessionToken: `Bearer ${token}`
                    });
                }
            )
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'Username already in use'
            })
        } else {
            res.status(500).json({
                error: `Failed to register user ${err}`
            });
        };
    };
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body.users;
    try {
        await models.UserModel.findOne({
            where: {
                email: email
            }
        })
            .then(
                user => {
                    if (user) {
                        bcrypt.compare(password, user.password, (err, matches) => {
                            if (matches) {
                                let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
                                res.status(200).json({
                                    user: user,
                                    message: 'logged in',
                                    sessionToken: `Bearer ${token}`
                                })
                            } else {
                                res.status(500).json({
                                    error: 'incorrect credentials'
                                })
                            }
                        })
                    } else {
                        res.status(502).json({
                            error: 'user doesnt exist '
                        })
                    }
                }
            )

    } catch (err) {
        res.status(501).send({
            error: 'server does not support'
        })
    }
})

// GET #1 GET ALL INFO
// router.get('/userinfo', validateJWT, async (req, res) => {
//     console.log(req.user)
//     try {
//         await models.UserModel.findAll({
//             include: [
//                 {
//                     model: models.PostModel,
//                     include: [
//                         {
//                             model: models.CommentsModel
//                         }
//                     ]
//                 }
//             ]
//         })
//             .then(
//                 userinfo => {
//                     res.status(200).json({
//                         message: "userinfo recieved",
//                         userinfo: userinfo
//                     })
//                 }
//             )
//     } catch (err) {
//         res.status(500).json({
//             message: `Could not retrive user info: ${errr}`
//         })
//     }

// })



module.exports = router