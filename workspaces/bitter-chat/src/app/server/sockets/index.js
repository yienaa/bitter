// socket.js
const socketIo = require('socket.io');
const joinRoomHandler = require('./room');

module.exports = (httpServer) => {
  const io = socketIo(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('a user connected');

    joinRoomHandler(socket);

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  return io;
};
