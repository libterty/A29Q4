const express = require('express')
const router = express.Router()
const nanoid = require('nanoid')

const Urls = require('../models')
const nanoCheck = require('../scripts')

let createLinkSuccess = false

router.get('/', (req, res) => {
    createLinkSuccess = false
    res.render('index', { createLinkSuccess })
})

router.post('/api/item', (req, res) => {
    Urls.findOne({ link: req.body.link }, async(err, url) => {
        console.log('url', url)
        if (err) return console.error(err)
        if (url) {
            createLinkSuccess = true
            res.render('index', { createLinkSuccess, shortenLink: url.shortenLink })
        } else {
            let shortenLink = nanoid(5)
            let isExist = await nanoCheck(shortenLink)
            while (isExist) {
                shortenLink = nanoid(5)
                isExist = await nanoCheck(shortenLink)
            }

            const urls = new Urls({
                link: req.body.link,
                shortenLink: shortenLink
            }).save((err, url) => {
                if (err) return console.error(err)
                createLinkSuccess = true
                res.render('index', { createLinkSuccess, shortenLink: url.shortenLink })
            })
        }
    })
})

router.get('/:id', (req, res) => {
    Urls.findOne({ shortenLink: req.params.id }, (err, url) => {
        if (err) return console.error(err)
        if (!url) {
            res.render('linkFailure', { failureLink: req.params.id })
        } else {
            res.redirect(`${url.link}`)
        }
    })
})

router.get('*', (req, res) => {
    res.redirect('/')
})

module.exports = router;