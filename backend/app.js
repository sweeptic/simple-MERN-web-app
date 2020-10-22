const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');

const express = require('express');

const bodyParser = require('body-parser');
const HttpError = require('./model/http-error');
const mongoose = require('mongoose');

const app = express();

//urlencoded - form data
//json - parse incoming req body  and convert  json object
app.use(bodyParser.json({ extended: false }));

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

//fallback middleware
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  throw error;
});

//error handling middleware function
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occured!' });
});

// app.use('/api/users', usersRoutes);

const URL =
  'mongodb+srv://olive4:hardfloor@nodejs.zzg9t.mongodb.net/MERN_test-nodejs_database?authSource=admin&replicaSet=atlas-fhng2k-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true';
mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000))
  .catch(err => console.log(err));
