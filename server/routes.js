const express = require('express')
const r = express.Router()
const user = require('./models/user')
const score = require('./models/score')

 r.get('/account', user.login)
 r.post('/account', user.createAccount)

 r.get('/score',score.stats)
 r.put('/score',score.updateStats)

module.exports = r
