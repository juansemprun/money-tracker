const mongoose = require('mongoose')

const connectionString = process.env.DB_REMOTE

// TEMPORARY DEBUG: shape of the connection string as seen at runtime,
// never the value itself. Remove after diagnosing the Vercel deploy.
console.error('[debug] DB_REMOTE shape:', JSON.stringify({
    defined: !!connectionString,
    length: (connectionString || '').length,
    startsOk: (connectionString || '').startsWith('mongodb+srv://'),
    endsOk: (connectionString || '').endsWith('majority'),
    atSigns: (connectionString.match(/@/g) || []).length,
    hasAngleBracket: /[<>]/.test(connectionString || ''),
    hasQuote: /["']/.test(connectionString || ''),
    hasSpace: /\s/.test(connectionString || ''),
}))

mongoose
    .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err))

module.exports = mongoose