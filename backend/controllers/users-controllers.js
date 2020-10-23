const { validationResult } = require('express-validator');
const { v4: uuid } = require('uuid');
const HttpError = require('../model/http-error');
const User = require('../model/user');

let DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Test User',
    email: 'test@test.com',
    password: 'abc',
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    );
  }

  const { name, email, password, places } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please try again later.',
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image:
      'https://previews.123rf.com/images/vikasuh/vikasuh1107/vikasuh110700323/10042501-funny-white-robot-stay-show-hello.jpg',
    password,
    places,
  });

  try {
    await createdUser.save();
  } catch (err) {
    // console.log(err);
    const error = new HttpError('Signing up failed, please try again', 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find(p => p.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      'Could not identify user, credentials seem to be wrong.',
      401
    );
  }
  res.json({ message: 'Logged in!' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;

/*
 const createPlace = (req, res, next) => {};
 
 */
