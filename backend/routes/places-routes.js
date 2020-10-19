const express = require('express');

const router = express.Router();

// import UserController from './app/controllers/UserController';
const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous scrapers in the world!',
    location: {
      lat: 40.7484533,
      lng: -73.9881007,
    },
    address: 'fssfdfsdfs',
    creator: 'u1',
  },
];

// places
router.get('/:pid', (req, res, next) => {
  const placeId = req.params.pid; //{pid: 'p1'}
  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });
  res.json({ place }); //place:place
});

module.exports = router;
