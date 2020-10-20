const { v4: uuid } = require('uuid');

const HttpError = require('../model/http-error');

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

const getPlaceById = (req, res, next) => {
  // console.log('/:pid');
  const placeId = req.params.pid; //{pid: 'p1'}
  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });

  if (!place) {
    // throw error -> sync
    // next -> use case of async error
    throw new HttpError('Could not find a place for the provided id', 404);
    //  throw error; //already cancel execution
  }

  res.json({ place }); //place:place
};

const getPlaceByUserId = (req, res, next) => {
  // console.log('/user/:uid');
  const userId = req.params.uid; //{pid: 'p1'}
  const place = DUMMY_PLACES.find(p => {
    return p.creator === userId;
  });
  // console.log(DUMMY_PLACES);
  if (!place) {
    throw new HttpError('Could not find a place for the provided user id', 404);
  }

  res.json({ place }); //place:place
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuid(),
    title, //title: title
    description,
    location: coordinates,
    address,
    creator,
  };
  // console.log(createdPlace);
  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
/*
const createPlace = (req, res, next) => {};

*/
