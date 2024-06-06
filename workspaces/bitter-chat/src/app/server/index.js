const express = require('express');
const next = require('next');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

const messagesRoute = require('./routes/message');
const roomRoute = require('./routes/room');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();
const httpServer = http.createServer(server);
const setupSocket = require('./sockets/index'); // socket.js 파일 임포트
const io = setupSocket(httpServer); // 소켓 설정

// 라우터에서 사용하기 위해 소켓 등록
server.io = io;

server.use(bodyParser.json());
server.use(cors({ origin: 'http://localhost:3000' })); // CORS 설정

// 라우트 설정
server.use('/api/messages', messagesRoute);
server.use('/api/room', roomRoute);

server.all('*', (req, res) => {
  return handle(req, res);
});

httpServer.listen(8000, (err) => {
  if (err) throw err;
  console.log('> Ready on http://localhost:8000');
});
