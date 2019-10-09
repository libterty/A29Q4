const mongoose = require('mongoose')

const databaseConnect = () => {
    return mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortenUrl', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    const db = mongoose.connection
    db.on('error', () => {
        console.log('mongodb error!')
    })
    db.once('open', () => {
        console.log('mongodb connected!')
    })
}

module.exports = databaseConnect;