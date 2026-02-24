const express = require("express");
const router = express.Router();
const { shortenUrl, redirectUrl, deleteUrl } = require('../controllers/urlController');
const { checkCache } = require('../middleware/cache');
const { rateLimiter } = require('../middleware/rateLimiter');


router.delete('/api/v1/urls/:shortUrlCode', deleteUrl);
router.get('/:shortUrlCode', checkCache, redirectUrl);
router.post('/api/v1/urls', rateLimiter, shortenUrl);

module.exports = router;