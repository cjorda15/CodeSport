const express = require('express')
const app = require('express')();
const http = require('http').Server(app);
const path = require('path')
const routes = require('./routes')
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const socketDb =  require('./socketDB')

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

  socket.on('logged in', (msg) => {
    socketDb.users[msg.username] = socket.id
  })

  socket.on('user entering warroom', (msg) => {
    socketDb.warRoomUsers.push(msg)
    io.sockets.emit('warRoomUsers',socketDb.warRoomUsers)
  })

  socket.on('user left warroom', (msg) => {
    socketDb.warRoomUsers.splice(socketDb.warRoomUsers.indexOf(msg),1)
    io.sockets.emit('warRoomUsers',socketDb.warRoomUsers)
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

  socket.on('requestBattle', (msg) => {
    if(!socketDb.users[msg.opponent])return
    io.sockets.connected[socketDb.users[msg.opponent]].emit('battleRequest', msg.user)
  })

  socket.on('current question', (msg) => {
    if(!socketDb.users[msg.challenger]){
      io.sockets.connected[socket.id].emit('challenger left')
    }else{
      io.sockets.connected[socketDb.users[msg.challenger]].emit('challenger question',msg.question)
   }
  })

  socket.on('send code', (msg) => {
    if(!socketDb.users[msg.challenger])return
    io.sockets.connected[socketDb.users[msg.challenger]].emit('challenger code',msg.code)
  })

  socket.on('acceptBattleRequest', (msg) => {
    if(!socketDb.users[msg.opponent])return
    socketDb.warRoomUsers.splice(socketDb.warRoomUsers.indexOf(msg.user),1)
    socketDb.warRoomUsers.splice(socketDb.warRoomUsers.indexOf(msg.opponent),1)
    io.sockets.emit('warRoomUsers',socketDb.warRoomUsers)
    io.sockets.connected[socketDb.users[msg.opponent]].emit('battleRequestAccepted', msg.user)
  })

  socket.on('declineBattleRequest', (msg) => {
    if(!socketDb.users[msg.opponent])return
    io.sockets.connected[socketDb.users[msg.opponent]].emit('battleRequestDeclined', msg.user)
  })

  socket.on('disconnect', function () {
    let disconnectUser = Object.keys(socketDb.users).filter(i => socketDb.users[i]===socket.id)
      if(socketDb.warRoomUsers.indexOf(disconnectUser[0])!==-1){
        socketDb.warRoomUsers.splice(socketDb.warRoomUsers.indexOf(disconnectUser[0]),1)
      }
    delete socketDb.users[disconnectUser[0]]
    io.sockets.emit('warRoomUsers',socketDb.warRoomUsers)
  })
});
