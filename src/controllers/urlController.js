const UrlMap = require('../models/UrlMap');
const Counter = require('../models/Counter');
const { encode } = require('../services/encodingService');
const { redisClient } = require('../config/redis');

const shortenUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        // check if url already exists
        let existingUrl = await UrlMap.findOne({ originalUrl });
        if (existingUrl) {
            return res.status(200).json({ originalUrl, shortUrl: `http://localhost:3000/${existingUrl.shortUrl}` });
        }


        let counter = await Counter.findByIdAndUpdate(
            { _id: 'url_count' },
            { $inc: { seq: 1 } },
            { new: true }
        );


        if (!counter) {
            counter = new Counter({ _id: 'url_count', seq: 1000000 });
            await counter.save();
        }

        const shortUrlCode = encode(counter.seq);

        const newUrlMap = new UrlMap({
            originalUrl,
            shortUrl: shortUrlCode,
            urlID: counter.seq
        });
        await newUrlMap.save();

        res.status(201).json({ originalUrl, shortUrl: `http://localhost:3000/${shortUrlCode}` });

    } catch (error) {
        console.error('Error shortening URL:', error);
        res.status(500).json({ error: 'Failed to shorten URL' });
    }
}


const redirectUrl = async (req, res) => {
    try {
        const { shortUrlCode } = req.params;
        const urlToRedirect = await UrlMap.findOne({ shortUrl: shortUrlCode });

        if (urlToRedirect) {
            await redisClient.setEx(shortUrlCode, 86400, urlToRedirect.originalUrl);
            return res.redirect(urlToRedirect.originalUrl);
        } else {
            return res.status(404).json({ error: 'No url found' });
        }

    } catch (error) {
        console.error('Error redirecting to url ', error);
        res.status(500).json({ error: 'server error' });
    }
};


const deleteUrl = async (req, res) => {
    try {
        const { shortUrlCode } = req.params;
        const deletedUrl = await UrlMap.findOneAndDelete({ shortUrl: shortUrlCode });
        if (deletedUrl) {
            return res.status(200).json({ message: 'URL removed successfully' });
        } else {
            return res.status(404).json({ error: 'No URL found to delete' });
        }

    } catch (error) {
        console.error('Error deleting URL: ', error);
        res.status(500).json({ error: 'server error' });
    }
};


module.exports = { shortenUrl, redirectUrl, deleteUrl };