const app = require('express')()

app.use(require('./user'))
app.use(require('./list'))
app.use(require('./login'))

module.exports = app