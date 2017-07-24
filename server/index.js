const express = require('express')
const app = require('express')();
const http = require('http').Server(app);
const path = require('path')
const routes = require('./routes')
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const socketDb =  require('./socketDB')

// app.locals.usersInWarRoom = []

app.use(bodyParser.json())

app.use("/build", express.static(path.join(__dirname,"/../build")))

app.use('/api/v1',routes)

app.get('/*', function(req,res){
  res.sendFile(path.join(__dirname + '/../public/index.html'));
})

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

http.listen(port, () => {
  process.stdout.write('\033c')
  console.log('listening on *:' + port)
})

io.on('connection', function(socket){
  console.log("socket id has connected", socket.id)
  console.log('user total after connection', io.engine.clientsCount)

  socket.on('disconnect', function () {
    console.log("socket id has disconncted", socket.id)
    console.log("user total after disconnect", io.engine.clientsCount)
  })

  socket.on('logged in', (msg) => {
    socketDb.users[msg.username] = socket.id
  })

  socket.on('random match request', (msg) => {
    if(socketDb.randomMatches.length>0){
      io.sockets.connected[socketDb.randomMatches[0].socket].emit('connected random 1v1', msg)
      io.sockets.connected[socketDb.users[msg]].emit('connected random 1v1',socketDb.randomMatches[0].username)
      socketDb.randomMatches.shift()
    }else{
    socketDb.randomMatches.push({username:msg, socket:socketDb.users[msg]})
    io.sockets.connected[socketDb.users[msg]].emit('awaiting random 1v1',"wait until another user joins random match")
    }
  })

  socket.on('point won', (msg) => {
    io.sockets.connected[socketDb.users[msg]].emit('challenger point')
  })

  socket.on('user entering warroom', (msg) => {
    if(!msg) return
    socketDb.warRoomUsers.push(msg)
    io.sockets.emit('warRoomUsers',socketDb.warRoomUsers)
  })

  socket.on('user left warroom', (msg) => {
    socketDb.warRoomUsers.splice(socketDb.warRoomUsers.indexOf(msg),1)
    io.sockets.emit('warRoomUsers',socketDb.warRoomUsers)
  })

  socket.on('requestBattle', (msg) => {
    io.sockets.connected[socketDb.users[msg.opponent]].emit('battleRequest', msg.user)
  })

  socket.on('acceptBattleRequest', (msg) => {
    console.log(socketDb.warRoomUsers,"!#@$!@$!@#$")
    socketDb.warRoomUsers.splice(socketDb.warRoomUsers.indexOf(msg.user),1)
    socketDb.warRoomUsers.splice(socketDb.warRoomUsers.indexOf(msg.opponent),1)
    io.sockets.emit('warRoomUsers',socketDb.warRoomUsers)
    io.sockets.connected[socketDb.users[msg.opponent]].emit('battleRequestAccepted', msg.user)
  })

  socket.on('declineBattleRequest', (msg) => {
    io.sockets.connected[socketDb.users[msg.opponent]].emit('battleRequestDeclined', msg.user)
  })
});
