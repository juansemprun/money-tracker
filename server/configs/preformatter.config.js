const path = require('path')

module.exports = app => {
    // node-sass-middleware only styles the server-rendered views; the API
    // does not need it. Skip silently when the dependency is absent
    // (e.g. serverless deploys, where node-sass cannot build).
    try {
        app.use(require('node-sass-middleware')({
            src: path.join(__dirname, '..', 'public'),
            dest: path.join(__dirname, '..', 'public'),
            sourceMap: true
        }))
    } catch (err) {
        console.warn('node-sass-middleware not available, skipping sass preformatting')
    }
}
