// Exhibition mode: demo sessions are read-only. Mutating requests are
// rejected here, in one place, regardless of what the client sends.
// Logout and the demo login itself remain allowed.
const DEMO_ALLOWED_WRITES = ['/demo-login', '/logout']

module.exports = app => {

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
