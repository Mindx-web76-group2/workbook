const express = require('express')
const router = express.Router()
const userRouter = require('./user.route');
const postRouter = require('./post.route');
const authRouter = require('./auth.route');
const loggerMdw = require('./../middlewares/logger.mdw')
const {requireAPIKey} = require('./../middlewares/apiKey.mdw')

router.use(loggerMdw)
router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/post', postRouter)

module.exports = router