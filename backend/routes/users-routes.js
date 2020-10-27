const express = require('express');
const usersControllers = require('../controllers/users-controllers');
const { check } = require('express-validator');
const fileUpload = require('../middlewares/file-upload');

const router = express.Router();

router.get('/', usersControllers.getUsers);

router.post(
  '/signup',
  fileUpload.single('image'),
  [
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
    check('name').not().isEmpty(),
  ],
  usersControllers.signup
);

router.post('/login', usersControllers.login);

module.exports = router;
