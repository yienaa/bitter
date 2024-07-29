// room Handler
module.exports = (socket) => {
  console.log('----- room handler -----');
  socket.on('room:join', (roomId, message) => {
    socket.join(roomId);
    console.log(`a user joined room ${roomId}`, { message });

    // 'message' 이벤트를 받으면 해당 룸에 메시지를 전송합니다.
    socket.on('room:createMsg', (message) => {
      socket.to(roomId).emit('room:createMsg', message);
      console.log(`Message sent to room ${roomId}: ${message}`);
    });

    socket.on('room:leave', (roomId) => {
      socket.leave(roomId);
      console.log(`a user left room ${roomId}`);
    });
  });
};
