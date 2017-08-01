const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration)

const login = (req, res) => {
  const { username,password } = JSON.parse(`${req.headers.authorization}`)
  database('users').where('username',username).andWhere('password',password).select()
  .then((user) => {
    res.status(200).json({username: user[0].username})
  })
  .catch(error => {
    //NOTE SEE ABOUT A 404 FOR USERS NOT FOUND
    res.status(500).send('username either doesnt exist or password doesnt match')
  })
}

const createAccount = (req, res) => {
    const {username,email,password,total_score, total_matches,total_wins} =  req.body
    let user = req.body
if(!username||!email||!password){
  res.status(403).send("bad insertion on creation of user, missing info")
}
  //NOTE catch doesnt seem to be working
  database('users').insert(user, 'username')
  .then(returnedUser => {
    res.status(201).json({username: returnedUser[0]})
  })
  .catch(error => {
    res.status(500).send('Username taken')
  })
}



module.exports = {
  login:login,
  createAccount:createAccount
}
