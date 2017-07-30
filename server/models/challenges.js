var MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db
MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err)
  }
  db = database
})

const create = (req, res) => {
  console.log(req.body)
  let challenge = req.body
  db.collection('challenges').insert({challenge_name: challenge.challenge_name,
                           tests: challenge.tests,
                           descriptions: challenge.descriptions,
                           difficulty: challenge.difficulty,
                           language: challenge.language,
                           username: challenge.username})
  .then(() => {
    res.status(201).send('created successfully')
  })
  .catch(err => res.status(500).send(err))
}

const getAll = (req, res) => {
  db.collection('challenges').find({}).toArray((err, results) => {
    if (err) return res.status(404).send({ message: 'Nothing found?' })
    res.status(200).json(results)
  })
}

module.exports = {
  create: create,
  getAll: getAll
}