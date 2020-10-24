const { v4: uuid } = require('uuid');

const HttpError = require('../models/http-error');

const { validationResult } = require('express-validator');

const getCoordsForAddress = require('../util/location');

const Place = require('../models/place');
const User = require('../models/user');
const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

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

const getPlacesByUserId = async (req, res, next) => {
  // console.log('/user/:uid');
  const userId = req.params.uid; //{pid: 'p1'}
  let userWithPlaces;
  // let places;
  try {
    userWithPlaces = await User.findById(userId).populate('places'); //  Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching places failed, please try again later',
      500
    );
    return next(error);
  }
  // console.log(DUMMY_PLACES);
  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    return next(
      new HttpError('Could not find a places for the provided user id', 404)
    );
  }
  res.json({
    places: userWithPlaces.places.map(place =>
      place.toObject({ getters: true })
    ),
  }); //place:place
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

  let user;

  try {
    user = await User.findById(creator);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Creating place failed, please try again.',
      404
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }

  console.log(user);

  try {
    // await createdPlace.save();
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });

    user.places.push(createdPlace); //add objectid
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError('Creating place failed, please try again', 500);
    return next(error);
  }

  // console.log('201');
  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    );
  }
  const { title, description } = req.body; //url + body mix
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong  - in find, could not update a place',
      500
    );
    return next(error);
  }
  place.title = title;
  place.description = description;
  // DUMMY_PLACES[placeIndex] = updatedPlace;
  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong - in save, could not update a place ',
      500
    );
    return next(error);
  }
  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId).populate('creator');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError('Could not find a place for this id', 404);
    return next(error);
  }

  // DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);

  try {
    // await place.remove();
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong - in save, could not deleting a place ',
      500
    );
    return next(error);
  }

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
