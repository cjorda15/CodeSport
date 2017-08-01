var MongoClient = require('mongodb').MongoClient
require('dotenv').config()
let ObjectId = require('mongodb').ObjectID;

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
    res.status(201).json({msg: 'created successfully'})
  })
  .catch(err => res.status(500).send(err))
}

const getAll = (req, res) => {
  // db.collection('challenges').deleteOne({ _id: ObjectId("597d3f36600e511e45f81d95")})
  //   .then(result => {
  //     res.status(200).send('worked')
  //   })
  db.collection('challenges').find({}).toArray((err, results) => {
    if (err) return res.status(404).send({ message: 'Nothing found?' })
    res.status(200).json(results)
  })
  // db.collection('challenges').find({}, ((err, results) => {
  //   res.send(results)
  // }))
}

module.exports = {
  create: create,
  getAll: getAll
}
