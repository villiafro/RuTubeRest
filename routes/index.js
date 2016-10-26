var express = require('express');
var router = express.Router();

var http = require('http');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/RuTube.sqlite');

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
  if(req.headers.token != "admin"){
    res.statusCode = 401;
    return res.json('Invalid token');
  }
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

/**
 * Get user from database by id
 */
router.get('/users/:id', function(req, res) {
  db.all("SELECT * FROM users WHERE id='" + req.params.id + "'", function(err, row) {
    if (err) return res.json(412, err);
    res.json(row);
  });
});

/**
 * Delete user from database
 */
router.delete('/users/:id', function(req, res) {
  if(req.headers.token != "admin"){
    res.statusCode = 401;
    return res.json('Invalid token');
  }
  db.run("DELETE FROM users WHERE id='" + req.params.id + "'", function(err) {
    if (err) return res.json(412, err);
    res.json(true);
  });
});

/**
 * Get all videos from the database
 */
router.get('/videos', function(req, res) {
  db.all('SELECT * FROM videos', function(err, row) {
    if (err) return res.json(412, err);
    res.json(row);
  });
});

module.exports = router;
