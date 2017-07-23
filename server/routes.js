const express = require('express')
const r = express.Router()
const user = require('./models/user')

 r.get('/account', user.login)
 r.post('/account', user.createAccount)

module.exports = r
