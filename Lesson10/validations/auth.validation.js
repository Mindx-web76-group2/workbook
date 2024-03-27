const Joi = require('joi');
const signup = {
    body: {
        uname: Joi.string()
            .alphanum()
            .min(3)
            .max(10)
            .required(),
        fname: Joi.string()
            .min(3)
            .max(50)
            .required(),
        pwd: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
        gender: Joi.number()
            .allow(null)
            .valid(1, 0, null),

    }
}

const login = {
    body: {
        uname: Joi.string()
            .alphanum()
            .min(3)
            .max(10)
            .required(),
        pwd: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required()
    }
}
module.exports = {
    signup,
    login
}