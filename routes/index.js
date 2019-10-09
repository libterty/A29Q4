const express = require('express')
const router = express.Router()
const nanoid = require('nanoid')

const Urls = require('../models')

let createLinkSuccess = false

router.get('/', (req, res) => {
    createLinkSuccess = false
    res.render('index', { createLinkSuccess })
})

router.post('/api/item', (req, res) => {
    Urls.findOne({ link: req.body.link }, (err, url) => {
        if (err) return console.error(err)
        if (url) {
            createLinkSuccess = true
            res.render('index', { createLinkSuccess, shortenLink: url.shortenLink })
        } else {
            const urls = new Urls({
                link: req.body.link,
                shortenLink: nanoid(5)
            }).save((err, url) => {
                if (err) return console.error(err)
                console.log(url)
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