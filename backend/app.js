const placesRoutes = require('./routes/places-routes');
// const usersRoutes = require('./routes/users-routes');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

//urlencoded - form data
//json - parse incoming req body  and convert  json object
app.use(bodyParser.json({ extended: false }));

app.use('/api/places', placesRoutes);

//error handling middleware function
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occured!' });
});

// app.use('/api/users', usersRoutes);

app.listen(5000);
