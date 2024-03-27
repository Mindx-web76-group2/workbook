const joi = require('joi');
const _ = require('lodash');
const validation = (schema) => {
    return async (req, res, next) => {
        try {
            const _schema = joi.object(schema);

            const valid = await _schema.validate(_.pick(req, Object.keys(schema)))

            console.log('------validation', valid, schema)
            const {error} = valid;

            if (error) {
                return res.status(400).json({
                    msg: 'Validation fail!',
                    error: error
                })
            } else {
                next()
            }

        } catch (e) {
            return res.status(400).json({
                msg: 'Validation fail!',
                error: e
            })
        }
    }
}

module.exports = validation