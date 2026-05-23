const Url = require('../models/Url');
const generateShortCode = require('../utils/generateShortCode');
const cache = require('../services/lruCache');

const shortenUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        const shortCode = generateShortCode();

        const newUrl = await Url.create({
            originalUrl,
            shortCode
        });

        res.json({
    originalUrl: newUrl.originalUrl,
    shortCode: newUrl.shortCode,
    shortUrl: `http://localhost:5000/api/url/${newUrl.shortCode}`
});

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const redirectUrl = async (req, res) => {
    try {

        const { code } = req.params;

        let cachedUrl = cache.get(code);

        if (cachedUrl) {

            await Url.findOneAndUpdate(
                { shortCode: code },
                { $inc: { clicks: 1 } }
            );

            return res.redirect(cachedUrl);
        }

        const url = await Url.findOne({
            shortCode: code
        });

        if (!url) {
            return res.status(404).json({
                error: 'URL not found'
            });
        }

        url.clicks += 1;

        await url.save();

        cache.set(code, url.originalUrl);

        return res.redirect(url.originalUrl);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const getAnalytics = async (req, res) => {
    try {

        const { code } = req.params;

        const url = await Url.findOne({
            shortCode: code
        });

        if (!url) {
            return res.status(404).json({
                error: 'URL not found'
            });
        }

        res.json({
            originalUrl: url.originalUrl,
            shortCode: url.shortCode,
            clicks: url.clicks,
            createdAt: url.createdAt
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    shortenUrl,
    redirectUrl,
    getAnalytics
};