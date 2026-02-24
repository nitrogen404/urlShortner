const { redisClient } = require('../config/redis');

const checkCache = async (req, res, next) => {
    const { shortUrlCode } = req.params;
    try {
        const cachedUrl = await redisClient.get(shortUrlCode);
        if (cachedUrl) {
            console.log('cached url found in redis memory');
            return res.redirect(cachedUrl);
        }
        next();
    } catch (error) {
        console.error('Error checking cache: ', error);
        next();
    }
}

module.exports = { checkCache };
