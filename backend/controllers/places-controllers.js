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
  console.log('/:pid');
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
  console.log('/user/:uid');
  const userId = req.params.uid; //{pid: 'p1'}
  const place = DUMMY_PLACES.find(p => {
    return p.creator === userId;
  });

  if (!place) {
    throw new HttpError('Could not find a place for the provided user id', 404);
  }

  res.json({ place }); //place:place
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
