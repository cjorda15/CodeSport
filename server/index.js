const express = require('express')
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path')
const port = process.env.PORT || 3000;

app.use("/build", express.static(path.join(__dirname,"/../build")))

app.get('/*', function(req,res){
  res.sendFile(path.join(__dirname + '/../public/index.html'));
})

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

io.on('connection', function(socket){
  console.log("socket id has connected", socket.id)
  io.sockets.emit('userConnection after connection', io.engine.clientsCount);
  console.log('userConnection after connection', io.engine.clientsCount)
  socket.on('hello', function(msg){
    socket.broadcast.emit('hi',msg+ socket.id)
  })

  socket.on('disconnect', function () {
    console.log("socket id has disconncted", socket.id)
    console.log("user total after disconnect", io.engine.clientsCount)

  });

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
