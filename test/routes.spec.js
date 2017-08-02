process.env.NODE_ENV = 'test'

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);


chai.use(chaiHttp);

describe('Client Routes', () => {

  it('should return the home page on the root', (done) => {
    chai.request(server)
    .get('/')
    .end((err, response) => {
      response.should.have.status(200)
      done()
    })
  })

});

// describe('API Routes', () => {
//
//     before((done) => {
//     database.migrate.latest().then(()=> done())
//   });
//
//   beforeEach((done) => {
//   database.seed.run()
//   .then(() => {
//     done()
//     });
//   })
//
//
//   it('should get a user with the correct password', (done) => {
//     chai.request(server)
//     .get('/api/v1/account')
//     .set('Authorization', JSON.stringify({username: 'DBULL7', password: 'a'}))
//     .end((err,response) => {
//        if (err) console.log(err)
//       response.should.have.status(200)
//       response.should.be.json
//       response.body.username.should.equal('DBULL7')
//       done()
//     })
//
//   })
//
//     it('should not get a user with a incorrect password', (done) => {
//       chai.request(server)
//       .get('/api/v1/account')
//       .set('Authorization', JSON.stringify({username: 'DBULL7', password: 'b'}))
//       .end((err,response) => {
//         response.should.have.status(500)
//         response.text.should.equal('username either doesnt exist or password doesnt match')
//         done()
//     })
//   })
//
//   it('should create a new user',(done) => {
//   const info =  {
//     username:"cj",
//     email: "cj@yahoo.com",
//     password:"boo",
//     total_score:0,
//     total_matches:0,
//     total_wins:0
//   }
//     chai.request(server)
//     .post('/api/v1/account')
//     .send(info)
//     .end((err,response) => {
//       response.should.have.status(201)
//       response.should.be.json
//       response.body.username.should.equal('cj')
//       done()
//     })
//   })
//
//   it('should not create a new user if username is already taken',(done) => {
//   const info =  {
//     username:"Reptar",
//     email: "cj@yahoo.com",
//     password:"boo",
//     total_score:0,
//     total_matches:0,
//     total_wins:0
//   }
//     chai.request(server)
//     .post('/api/v1/account')
//     .send(info)
//     .end((err,response) => {
//       response.should.have.status(500)
//       response.text.should.equal('Username taken')
//       done()
//     })
//   })
//
//   it('should not create a new user without all the information',(done) => {
//   const info =  {
//     password:"boo",
//     total_matches:0,
//     total_wins:0
//   }
//     chai.request(server)
//     .post('/api/v1/account')
//     .send(info)
//     .end((err,response) => {
//       response.should.have.status(403)
//       response.text.should.equal('bad insertion on creation of user, missing info')
//       done()
//     })
//   })
//
//
// });
