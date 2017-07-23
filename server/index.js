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
  console.log("socket id has connected", socket.id)
  console.log('user total after connection', io.engine.clientsCount)

  socket.emit("userConnection","HELLLO")

  socket.on('disconnect', function () {
    console.log("socket id has disconncted", socket.id)
    console.log("user total after disconnect", io.engine.clientsCount)
  })

  socket.on('logged in', (msg) => {
    socketDb.users[msg.username] = socket.id
  })

  socket.on('random match request', (msg) => {
    console.log(msg,"message from random request by client socket")
      if(socketDb.randomMatches.length>0){
        io.sockets.connected[socketDb.randomMatches[0].socket].emit('connected random 1v1', msg)
        io.sockets.connected[socketDb.users[msg]].emit('connected random 1v1',socketDb.randomMatches[0].username)
        socketDb.randomMatches.shift()
        console.log(socketDb.randomMatches)
      }else{
      socketDb.randomMatches.push({username:msg, socket:socketDb.users[msg]})
      console.log(socketDb.users[msg])
      io.sockets.connected[socketDb.users[msg]].emit('awaiting random 1v1',"wait until another user joins random mathches")
    }
  })

  socket.on('point won', (msg) => {
    console.log(msg,"from point won in server")
    io.sockets.connected[socketDb.users[msg]].emit('challenger point')
  })
});
