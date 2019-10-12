const mongoose = require('mongoose')

const databaseConnect = () => {
    return mongoose
        .connect(process.env.MONGODB_URI || 'mongodb://localhost/shortenUrl', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => console.log('MogoDB is Ready!'))
        .catch(err => console.log(`Something went wrong ${err}`))
}

module.exports = databaseConnect;