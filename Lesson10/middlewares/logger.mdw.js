const logRequestTime = (req, res, next) => {
    console.log('Logger ~~~ An API is comming at ', new Date());
    next();
}

module.exports = logRequestTime;