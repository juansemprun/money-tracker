const mongoose = require('mongoose')

const connectionString = process.env.DB_REMOTE

// TEMPORARY DEBUG: the exact connection string with the password masked,
// plus password diagnostics (never the value). Remove after diagnosing.
const _pw = ((connectionString || '').match(/:[^:@]+@/) || [''])[0].slice(1, -1)
let _pwDecode = 'ok'
try { decodeURIComponent(_pw) } catch (e) { _pwDecode = 'FAILS: ' + e.message }
console.error('[debug] DB_REMOTE masked:', JSON.stringify(
    (connectionString || '').replace(/:[^:@]+@/, ':***@')
))
console.error('[debug] password diag:', JSON.stringify({
    length: _pw.length,
    hasPercent: _pw.includes('%'),
    decodes: _pwDecode,
}))

mongoose
    .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err))

module.exports = mongoose