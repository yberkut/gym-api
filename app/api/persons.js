var Person = require('../models/person');

module.exports = function (router) {

  if (!router.route) {
    throw 'express router expected. Please provide correct argument.'
  }

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
};