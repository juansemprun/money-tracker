const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

// CORS
const whitelist = [process.env.DOMAIN_REMOTE, process.env.DOMAIN_LOCAL]
const corsOptions = {
    origin: (origin, cb) => {
        const originIsWhitelisted = whitelist.includes(origin)
        cb(null, originIsWhitelisted)
    },
    credentials: true
}

module.exports = app => {
    app.use(cors())
    app.use(logger('dev'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cookieParser())
}