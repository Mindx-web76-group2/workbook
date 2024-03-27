const express = require('express')
const router = express.Router();
const {getAllUsers, getUsersBy, createAnUser, createUsers, uploadAvatar} = require('../controllers/user.controller')
const {requireAPIKeyByParams} = require('./../middlewares/apiKey.mdw')
const authMdw = require('./../middlewares/auth.mdw');
const {imageUploadLocal} = require('./../middlewares/uploadImageToLocal.mdw');

// CRUD
// router.use(authMdw)
router.get('/all', getAllUsers)

router.post('/search', getUsersBy)

router.post('/createOne', createAnUser)

router.post('/createMany', createUsers)

// update by uname/fname/gender (uname)
router.put('/update/:uname', )

// delete by uname/fname/gender (uname)
router.delete('/delete/:uname', )

router.post("/upload/avatar", imageUploadLocal, uploadAvatar);

module.exports = router;