const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration)

const login = (req, res) => {
  const { username,password } = JSON.parse(`${req.headers.authorization}`)

  database('users').where('username',username).andWhere('password',password).select()
  .then((user) => {
    res.json(user[0].username)
  })
}

const createAccount = (req, res) => {
  //NOTE catch doesnt seem to be working
  let user = req.body
  database('users').insert(user, 'username')
  .then(returnedUser => {
    res.status(201).json({username: returnedUser[0]})
  })
  .catch(error => {
    console.log('error', error);
    res.sendStatus(500).send('Username taken')
  })
}



module.exports = {
  login:login,
  createAccount:createAccount
}
