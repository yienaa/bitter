const express = require('express');
const crypto = require('crypto');
const router = express.Router();

let rooms = [
  {
    id: 'a12345',
    name: '월요일대화',
    recent: '안녕하세요, 월요일',
    time: new Date().toISOString(),
  },
  {
    id: 'b123345',
    name: '화요일은 커피',
    recent: '오더프레소가자',
    time: new Date().toISOString(),
  },
  {
    id: 'c123345',
    name: '수요일은 재택',
    recent: '늦잠자야지',
    time: new Date().toISOString(),
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
