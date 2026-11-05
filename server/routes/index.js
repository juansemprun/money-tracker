// Exhibition mode: demo sessions are read-only. Mutating requests are
// rejected here, in one place, regardless of what the client sends.
// Logout and the demo login itself remain allowed.
const DEMO_ALLOWED_WRITES = ['/demo-login', '/logout']

// Cold-start guard (serverless): requests may arrive before the async
// mongoose.connect() has finished. Wait (bounded) until the connection is
// ready instead of letting the first query fail. A permanent failure
// surfaces as a 503 after the timeout instead of a misleading 500.
const mongoose = require('mongoose')

function waitForDb(timeoutMs = 15000) {
  return new Promise((resolve, reject) => {
    if (mongoose.connection.readyState === 1) return resolve()
    const onConnected = () => { cleanup(); resolve() }
    const timer = setTimeout(() => {
      cleanup()
      reject(new Error(`DB not connected after ${timeoutMs}ms`))
    }, timeoutMs)
    const cleanup = () => {
      clearTimeout(timer)
      mongoose.connection.removeListener('connected', onConnected)
    }
    mongoose.connection.once('connected', onConnected)
  })
}

module.exports = app => {

  app.use('/api', (req, res, next) => {
    waitForDb()
      .then(() => next())
      .catch(() => res.status(503).json({ message: 'Service warming up, please retry' }))
  })

  app.use('/api', (req, res, next) => {
    const isDemoSession = req.session && req.session.isDemo
    const isMutation = req.method !== 'GET'
    const isAllowed = DEMO_ALLOWED_WRITES.includes(req.path)
    if (isDemoSession && isMutation && !isAllowed) {
      return res.status(403).json({ message: 'Demo user is read-only' })
    }
    next()
  })

  // Base URLS
  app.use('/api', require('./profile.routes'))
  app.use('/api', require('./transactions.routes'))
  app.use('/api', require('./currencies.routes'))
  app.use('/api', require('./categories.routes'))
  app.use('/api', require('./accountType.routes'))
  app.use('/api', require('./accounts.routes'))
  app.use('/api', require('./auth.routes'))
}
