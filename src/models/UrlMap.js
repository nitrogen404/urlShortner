const mongoose = require('mongoose');

const urlMapSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    urlID: { type: Number, required: true, unique: true },
    expiresAt: { type: Date, default: null, }
}, { timestamps: true });

module.exports = mongoose.model('UrlMap', urlMapSchema);
