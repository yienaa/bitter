const express = require('express');
const crypto = require('crypto');
const router = express.Router();

let rooms = [
  {
    id: crypto.randomUUID(),
    name: '홍길동1대화',
    recent: '안녕하세요',
    time: '오후 2:30',
  },
  {
    id: crypto.randomUUID(),
    name: '홍길동2대화',
    recent: '안녕하십니까',
    time: '오후 2:35',
  },
];

// Get all rooms
router.get('/', (req, res) => {
  res.json(rooms);
});

// Get a single room
router.get('/:id', (req, res) => {
  const room = rooms.find((r) => r.id === req.params.id);
  if (!room) return res.status(404).send('Room not found');
  res.json(room);
});

// Create a new room
router.post('/', (req, res) => {
  const newRoom = {
    id: crypto.randomUUID(),
    name: req.body.name,
    recent: req.body.recent,
    time: req.body.time,
  };
  rooms.push(newRoom);
  res.status(201).json(newRoom);
});

// Update a room
router.put('/:id', (req, res) => {
  const room = rooms.find((r) => r.id === req.params.id);
  if (!room) return res.status(404).send('Room not found');

  room.name = req.body.name;
  room.recent = req.body.recent;
  room.time = req.body.time;
  res.json(room);
});

// Delete a room
router.delete('/:id', (req, res) => {
  const roomIndex = rooms.findIndex((r) => r.id === req.params.id);
  if (roomIndex === -1) return res.status(404).send('Room not found');

  rooms.splice(roomIndex, 1);
  res.status(204).send();
});

module.exports = router;
