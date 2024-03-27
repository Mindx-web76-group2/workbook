const User = require('./../models/user');
const jwt = require('jsonwebtoken')
const {findUsersBy, insertUser, updateUserBy} = require('../services/user.service');
const bcrypt = require('bcrypt')
const login = async (req, res) => {
    const {uname, pwd} = req.body || {};
    // 1. validation request body
    if (!uname || !pwd) {
        return res.status(400).json({
            msg: 'Mssing required keys'
        })
    }

    // 2. Check existing
    const existingUser = await findUsersBy({filters: {uname}})

    if (!existingUser || existingUser.length === 0) {
        return res.status(404).json({
            msg: 'Username is wrong!'
        })
    }

    const isTheSame = await bcrypt.compare(pwd, existingUser[0].pwd);
    if (!isTheSame) {
        return res.status(404).json({
            msg: 'Password is wrong!'
        })
    }


    if (!existingUser[0].isActive) {
        return res.status(403).json({
            msg: 'User is not active'
        })
    }

    // 3. Phát hành 1 tấm vé chứa token cho user (client)
    const payload = {
        uname: existingUser[0].uname,
        fname: existingUser[0].fname,
        role: existingUser[0].role
    }

    const KEY = process.env.PRIVATE_KEY;
    const EXPIRED_TIME = process.env.EXPIRED_TIME;

    const token = jwt.sign(payload, KEY, {expiresIn: EXPIRED_TIME});

    // 4. Trả token về client
    return res.json({
        msg: 'Login successfully!',
        token
    })
}

const signup = async (req, res) => {
    const {uname, fname, gender=0, pwd} = req.body || {};
    // 1. Validation request body
    if (!uname || !fname || !pwd) {
        return res.status(400).json({
            msg: 'Missing required keys',
        })
    }
    // 2. Check duplicate  username
    const existingUser = await findUsersBy({filters: {uname}});
    if (existingUser && existingUser.length > 0) {
        console.log(existingUser)
        if (existingUser[0].isActive) {
            return res.status(400).json({
                msg: 'Username is already taken'
            })
        }
    } else {
        //  3. Create new user
        const saltRound = 10;
        const genSalt = await bcrypt.genSalt(saltRound);
        const hash = await bcrypt.hash(pwd, genSalt);

        await insertUser({uname, fname, gender, pwd: hash});
    }



    // 4. Phát hành vé active account
    const payload = {
        uname: uname,
    }

    const KEY = process.env.PRIVATE_KEY;
    const EXPIRED_TIME = process.env.EXPIRED_TIME;

    const token = jwt.sign(payload, KEY, {expiresIn: EXPIRED_TIME});

    return res.status(201).json({
        msg: 'Signup successfully!',
        token
    })
}

const verify = async (req, res) => {
    const {decode} = req;
    if (decode) {
        const {uname} = decode;
        const existingUser = await findUsersBy({filters: {uname}});
        console.log(existingUser)
        if (existingUser && existingUser.length > 0) {
            //1. 
            const {isActive} = existingUser[0];
            if (isActive) {
                return res.status(200).json({
                    msg: 'User is active'
                })
                // 2.
            } else {
                await updateUserBy({isActive: true}, {uname})
                return res.status(200).json({
                    msg: 'Verified successfully!'
                })
            }
        } else {
            return res.status(404).json({
                msg: 'User is not found! Register plz!'
            })
        }
    } else {
        return res.status(400).json({
            msg: 'Token is invalid!'
        })
    }
}
module.exports = {
    login,
    signup, 
    verify
}