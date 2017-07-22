const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration)

const login = (req, res) => {

const {username,password} = JSON.parse(`${req.headers.authorization}`)

  database('users').where('username',username).andWhere('password',password).select()
  .then((user) => {
    res.json(user[0])
  })
}



module.exports = {
  login : login
}
