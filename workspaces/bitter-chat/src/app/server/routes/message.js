const express = require('express');
const crypto = require('crypto');
const router = express.Router();

let messages = [
  {
    id: crypto.randomUUID(),
    user: '홍길동1',
    message: '안녕하세욥!',
    time: '오후 2:30',
  },
  {
    id: crypto.randomUUID(),
    user: '홍길동2',
    message: '안녕하세요!',
    time: '오후 2:35',
  },
];

// Get all messages
router.get('/', (req, res) => {
  res.json(messages);
});

// Get a single message
router.get('/:id', (req, res) => {
  const message = messages.find((m) => m.id === req.params.id);
  if (!message) return res.status(404).send('Message not found');
  res.json(message);
});

// Create a new message
router.post('/', (req, res) => {
  const newMessage = {
    id: crypto.randomUUID(),
    user: req.body.user,
    message: req.body.message,
    time: new Date().toDateString(),
  };
  messages.push(newMessage);
  res.status(201).json(newMessage);

  // socket.io 인스턴스를 사용하여 'message created' 이벤트 방출
  req.app.io.emit('message:create', newMessage);
});

// Update a message
router.put('/:id', (req, res) => {
  const message = messages.find((m) => m.id === req.params.id);
  if (!message) return res.status(404).send('Message not found');

  message.user = req.body.user;
  message.message = req.body.message;
  message.time = req.body.time;
  res.json(message);
});

// Delete a message
router.delete('/:id', (req, res) => {
  const messageIndex = messages.findIndex((m) => m.id === req.params.id);
  if (messageIndex === -1) return res.status(404).send('Message not found');

  messages.splice(messageIndex, 1);
  res.status(204).send();
});

module.exports = router;
