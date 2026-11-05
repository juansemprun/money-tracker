const mongoose = require('mongoose')

const connectionString = process.env.DB_REMOTE

// TEMPORARY DEBUG: the exact connection string with the password masked,
// JSON.stringify makes any invisible character visible. Remove after diagnosing.
console.error('[debug] DB_REMOTE masked:', JSON.stringify(
    (connectionString || '').replace(/:[^:@]+@/, ':***@')
))

mongoose
    .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err))

module.exports = mongoose