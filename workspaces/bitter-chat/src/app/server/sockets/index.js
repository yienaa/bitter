// socket.js
const Socket = require('socket.io');
const joinRoomHandler = require('./room');

module.exports = (httpServer) => {
  const io = Socket(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
ㅁ구     // console.log 를 찍어보면 소켓이 수도없이 생성되는대 이유를 모르겠음.

    io.sockets.emit('init', socket.id);

    joinRoomHandler(socket);

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  return io;
};
