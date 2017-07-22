const express = require('express')
const r = express.Router()
const user = require('./models/user')

 r.get("/login", user.login)

module.exports = r
