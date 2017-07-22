const express = require('express')
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path')
const port = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname,"public")))
app.use("/build", express.static(path.join(__dirname,"/../build")))


app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

io.on('connection', function(socket){
  console.log("CONNECTED", io.engine.clientsCount)
  console.log("socket id", socket.id)
  io.sockets.emit('userConnection', io.engine.clientsCount);

  socket.on('disconnect', function () {
    console.log("socket id", socket.id)

  });

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
