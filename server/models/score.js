const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration)

const updateStats = (req, res) => {
  let body = req.body
  const { username, score, win, date } = body

  database('users').where('username',username).select()
  .update({
    'updated_at': date,
    'total_score': database.raw(`total_score + ${score}`),
    'total_matches': database.raw(`total_matches + 1`),
    'total_wins': database.raw(`total_wins ${win}`)
    })
   .then(stats => {
    res.status(200).json(stats)})
   .catch(err => {
    console.log('error', error)
    res.status(501).json(err)
  })
}

const stats = (req, res) => {
  const {username} = JSON.parse(`${req.body}`)
  database('users').returning(["total_score","total_matches","total_wins"]).where('username',username).select()
  .then(stats => res.status(200).json(stats))
  .catch(err => res.status(501).send(err))
}




module.exports = {
  updateStats:updateStats,
  stats:stats
}
