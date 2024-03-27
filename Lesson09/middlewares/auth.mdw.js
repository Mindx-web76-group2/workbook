const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        // 1. Validation token 
        if (!token) {
            return res.status(400).json({
                msg: 'Missing token',
            })
        }

        const KEY = process.env.PRIVATE_KEY;
        // 2. Decode token 
        const decode = jwt.verify(token, KEY);
        console.log(decode);
        req.decode = decode;

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(400).json({
                msg: 'Token is expired!'
            })
        } else {
            return res.status(500).json({
                msg: error.message,
                stack: error.stack
            })
        }
    }
}

module.exports = authMiddleware;