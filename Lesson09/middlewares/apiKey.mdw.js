const requireAPIKey = (req, res, next) => {
    const apiKey = req.headers['api-key'] || null;
    console.log(req.headers)
    if (!apiKey) {
        return res.status(503).json({
            msg: 'Missing apiKey!'
        })
    }
    next();
}

const requireAPIKeyByParams = (req, res, next) => {
    const apiKey = req.params['apiKey'] || null;
    console.log(req.params)
    if (!apiKey) {
        return res.status(503).json({
            msg: 'Missing apiKey!'
        })
    }
    next();
}
module.exports = {
    requireAPIKey,
    requireAPIKeyByParams
};