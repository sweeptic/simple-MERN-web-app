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
  console.log('/:pid');
  const placeId = req.params.pid; //{pid: 'p1'}
  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });

  if (!place) {
    // throw error -> sync
    // next -> use case of async error
    const error = new Error('Could not find a place for the provided id');
    error.code = 404;
    //  throw error; //already cancel execution
    return next(error);
  }

  res.json({ place }); //place:place
});

router.get('/user/:uid', (req, res, next) => {
  console.log('/user/:uid');
  const userId = req.params.uid; //{pid: 'p1'}
  const place = DUMMY_PLACES.find(p => {
    return p.creator === userId;
  });

  if (!place) {
    const error = new Error('Could not find a place for the provided user id');
    error.code = 404;
    //  return next(error);
    throw error;
  }

  res.json({ place }); //place:place
});

module.exports = router;
