const express = require('express')
const r = express.Router()
const user = require('./models/user')
const score = require('./models/score')
const challenges = require('./models/challenges')

 r.get('/account', user.login)
 r.post('/account', user.createAccount)

 r.get('/score', score.stats)
 r.put('/score', score.updateStats)

 r.get('/challenges', challenges.getAll)
 r.post('/challenges', challenges.create)

module.exports = r
