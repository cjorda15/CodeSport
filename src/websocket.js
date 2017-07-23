const socket = io({transports: ['websocket'], upgrade: false});

socket.on('userConnection', (msg) => {
  console.log(msg,"MESSAGE FROM SERVER!!!!!!")
  socket.emit('hello',"sup from " )
})

socket.on('hi', (msg) => {
  console.log(msg,"MESSAGE FROM OTHER USER")
})
