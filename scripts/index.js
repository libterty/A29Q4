const Urls = require('../models')


function nanoCheck(nanoid) {
    return new Promise((resolve, reject) => {
        Urls
            .findOne({ shortenLink: nanoid })
            .exec((err, url) => {
                console.log(url)
                if (err) reject(err)
                if (url === null) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
    })
}

module.exports = nanoCheck