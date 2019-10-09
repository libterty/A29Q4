const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UrlSchema = new Schema({
    link: {
        type: String,
        required: true
    },

    shortenLink: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Url', UrlSchema)