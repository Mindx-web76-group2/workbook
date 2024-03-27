const express = require('express')
const router = express.Router();
const {getAllUsers, getUsersBy, createAnUser, createUsers} = require('../controllers/user.controller')
const {requireAPIKeyByParams} = require('./../middlewares/apiKey.mdw')
const authMdw = require('./../middlewares/auth.mdw');

// CRUD
router.use(authMdw)
router.get('/all/:apiKey', requireAPIKeyByParams, getAllUsers)

router.post('/search', getUsersBy)

router.post('/createOne', createAnUser)

router.post('/createMany', createUsers)

// update by uname/fname/gender (uname)
router.put('/update/:uname', )

// delete by uname/fname/gender (uname)
router.delete('/delete/:uname', )

module.exports = router;