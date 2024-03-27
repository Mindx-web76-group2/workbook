const express = require('express')
const router = express.Router();

const {login, signup, verify} = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.mdw');
const validationMiddleware = require('../middlewares/validation.mdw');

const {signup: signupSchema, login: loginSchema} = require('../validations/auth.validation')
// Signup
/**
 *        
        uname: 'vivt',
        fname: 'Vo Tuong Vi',
        gender: 0,
        role: 'admin',
        pwd: '123'
 */
router.post('/signup', validationMiddleware(signupSchema), signup )


// login
router.post('/login', validationMiddleware(loginSchema), login)

// verify
router.post('/verify', authMiddleware, verify)

module.exports = router;