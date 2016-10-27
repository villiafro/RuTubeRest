var express = require('express');
var router = express.Router();
var db = require('../models/database');

/**
 * Get all users from the database
 */

router.get('/users', function(req, res) {
  db.all('SELECT * FROM users', function(err, row) {
    if (err) return res.json(412, err);
    res.json(row);
  });
});

/**
 * Add a new user to database
 */

router.post('/users', function(req, res) {
  var id = req.body.id;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var admin = req.body.admin;

  var sqlRequest = "INSERT INTO 'users' (id, firstname, lastname, username, password, email, admin) " +
                    "VALUES('" + id + "', '" + firstname + "', '" + lastname + "', '" + username + "', '" + password + "', '" + email + "', '" + admin + "')"
  db.run(sqlRequest, function(err) {
    if (err) return res.json(412, err);
    res.json(true);
  });
});

module.exports = router;