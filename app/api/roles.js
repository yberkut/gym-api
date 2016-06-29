var Role = require('../models/role');

module.exports = function (router) {

  if (!router.route) {
    throw 'express router expected. Please provide correct argument.'
  }

  router.route('/roles')
  // create a role (accessed at POST http://localhost:8080/api/roles)
    .post(function (req, res) {

      var role = new Role();
      role.name = req.body.name;

      role.save(function (err) {
        if (err)
          res.send(err);

        res.json({message: 'Role created!'});
      });

    })
    // get all the roles (accessed at GET http://localhost:8080/api/roles)
    .get(function (req, res) {
      Role.find(function (err, roles) {
        if (err)
          res.send(err);

        res.json(roles);
      });
    });

  // on routes that end in /roles/:role_id
  // ----------------------------------------------------
  router.route('/roles/:role_id')
  // get the role with that id (accessed at GET http://localhost:8080/api/roles/:role_id)
    .get(function (req, res) {
      Role.findById(req.params.role_id, function (err, role) {
        if (err)
          res.send(err);
        res.json(role);
      });
    })
    // update the role with this id (accessed at PUT http://localhost:8080/api/roles/:role_id)
    .put(function (req, res) {

      Role.findById(req.params.role_id, function (err, role) {

        if (err)
          res.send(err);

        role.name = req.body.name;

        role.save(function (err) {
          if (err)
            res.send(err);

          res.json({message: 'Role updated!'});
        });

      })
    })
    // delete the role with this id (accessed at DELETE http://localhost:8080/api/roles/:role_id)
    .delete(function (req, res) {
      Role.remove({
        _id: req.params.role_id
      }, function (err, role) {
        if (err)
          res.send(err);

        res.json({message: 'Successfully deleted'});
      });
    });
};