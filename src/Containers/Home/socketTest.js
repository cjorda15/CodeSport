var io = require('socket.io').listen(5000);

io.sockets.on('connection', function (socket) {

});


export default io
