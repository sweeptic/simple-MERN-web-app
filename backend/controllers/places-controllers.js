const { v4: uuid } = require('uuid');

const HttpError = require('../model/http-error');

const { validationResult } = require('express-validator');

const getCoordsForAddress = require('../util/location');

const Place = require('../model/place');

let DUMMY_PLACES = [
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

const getPlaceById = async (req, res, next) => {
  // console.log('/:pid');
  const placeId = req.params.pid; //{pid: 'p1'}
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a place',
      500
    );
    return next(error);
  }

  if (!place) {
    // throw error -> sync
    // next -> use case of async error
    const error = new HttpError(
      'Could not find a place for the provided id',
      404
    );
    //  throw error; //already cancel execution
    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) }); //place:place
};

const getPlacesByUserId = (req, res, next) => {
  // console.log('/user/:uid');
  const userId = req.params.uid; //{pid: 'p1'}
  const places = DUMMY_PLACES.filter(p => {
    return p.creator === userId;
  });
  // console.log(DUMMY_PLACES);
  if (!place || DUMMY_PLACES.length === 0) {
    throw new HttpError(
      'Could not find a places for the provided user id',
      404
    );
  }

  res.json({ places }); //place:place
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    );
  }

  const { title, description, address, creator } = req.body;
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      'https://en.wikipedia.org/wiki/File:Empire_State_Building_(aerial_view).jpg',
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError('Creating place failed, please try again', 500);
    return next(error);
  }

  // console.log('201');
  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data', 422);
  }

  const { title, description } = req.body; //url + body mix
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  if (!DUMMY_PLACES.find(p => p.id !== placeId)) {
    throw new HttpError('Could not find a place for that id.', 404);
  }

  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
  res.status(200).json({ message: 'Deleted place.' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
/*
const createPlace = (req, res, next) => {};

*/
