const socket = io({transports: ['websocket'], upgrade: false});
socket.on('userConnection', (msg) => {
  console.log(msg,"MESSAGE FROM SERVER!!!!!!")
  console.log(socket,"from socket file")
  socket.emit('hello',"sup from " )
})

socket.on('hi', (msg) => {
  console.log(msg,"MESSAGE FROM OTHER USER")
})

export default socket
