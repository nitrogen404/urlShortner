const { redisClient } = require('../config/redis');
const WINDOW_SIZE_IN_SECONDS = 60;
const MAX_REQUESTS = 10;

const rateLimiter = async (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const redisKey = `rate_limit:${ip}`;

    try {
        const requests = await redisClient.incr(redisKey);
        if (requests === 1) {
            await redisClient.expire(redisKey, WINDOW_SIZE_IN_SECONDS);
        }

        if (requests > MAX_REQUESTS) {
            return res.status(429).json({
                error: 'Too many requests, Please try again later'
            });
        }
        next();
    } catch (error) {
        console.error(`Rate limiter error: ${error}`);
        next();
    }

}

module.exports = { rateLimiter };