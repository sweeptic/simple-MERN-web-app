const express = require('express');
const placesControllers = require('../controllers/places-controllers');
const { check } = require('express-validator');
const fileUpload = require('../middlewares/file-upload');
const checkAuth = require('../middlewares/check-auth');
const router = express.Router();

//open to everyone
router.get('/:pid', placesControllers.getPlaceById);

router.get('/user/:uid', placesControllers.getPlacesByUserId);

//route protection - auth middleware
router.use(checkAuth);

//not open to everyone
router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty(),
  ],
  placesControllers.createPlace
);

router.patch(
  '/:pid',
  [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
  placesControllers.updatePlace
);

router.delete('/:pid', placesControllers.deletePlace);

module.exports = router;
