// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://gymuser:pass234@ds021034.mlab.com:21034/gym-db'); // connect to our database

var Person = require('./app/models/person');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
  res.json({message: 'Hooray!!! Welcome to our api!'});
});

// more routes for our API will happen here

// on routes that end in /persons
// ----------------------------------------------------
router.route('/persons')

// create a person (accessed at POST http://localhost:8080/api/persons)
  .post(function (req, res) {

    var person = new Person();      // create a new instance of the Person model
    person.firstName = req.body.firstName;  // set the persons firstName (comes from the request)

    // save the person and check for errors
    person.save(function (err) {
      if (err)
        res.send(err);

      res.json({message: 'Person created!'});
    });

  })
  // get all the persons (accessed at GET http://localhost:8080/api/persons)
  .get(function (req, res) {
    Person.find(function (err, bears) {
      if (err)
        res.send(err);

      res.json(bears);
    });
  });

// on routes that end in /persons/:person_id
// ----------------------------------------------------
router.route('/persons/:person_id')

// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
  .get(function (req, res) {
    Person.findById(req.params.person_id, function (err, person) {
      if (err)
        res.send(err);
      res.json(person);
    });
  })
  // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
  .put(function (req, res) {

    // use our person model to find the person we want
    Person.findById(req.params.person_id, function (err, person) {

      if (err)
        res.send(err);

      person.firstName = req.body.firstName;  // update the persons info

      // save the person
      person.save(function (err) {
        if (err)
          res.send(err);

        res.json({message: 'Person updated!'});
      });

    })
  })
  // delete the person with this id (accessed at DELETE http://localhost:8080/api/persons/:person_id)
  .delete(function (req, res) {
    Person.remove({
      _id: req.params.person_id
    }, function (err, person) {
      if (err)
        res.send(err);

      res.json({message: 'Successfully deleted'});
    });
  });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);