module.exports = app => {

  // Base URLS
  app.use('/api', require('./profile.routes'))
  app.use('/api', require('./transactions.routes'))
  app.use('/api', require('./currencies.routes'))
  app.use('/api', require('./categories.routes'))
  app.use('/api', require('./accountType.routes'))
  app.use('/api', require('./accounts.routes'))
  app.use('/api', require('./auth.routes'))
}
