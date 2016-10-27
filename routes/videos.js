var express = require('express');
var router = express.Router();
var db = require('../models/database');

/**
 * Get all videos from the database
 */

router.get('/', function (req, res) {
    db.all('SELECT * FROM videos', function (err, row) {
        if (err) return res.json(412, err);
        res.json(row);
    });
});

/**
 * Get a single video
 */

router.get('/:id', function(req, res) {
    db.all("SELECT * FROM videos WHERE id='" + req.params.id + "'", function(err, row) {
        if (err) return res.json(412, err);
        res.json(row);
    });
});

/**
 * Get all videos from a single user
 */

router.get('/channel/:id', function (req, res) {
    db.all("SELECT * FROM videos WHERE u_id='" + req.params.id + "'", function (err, row) {
        if (err) return res.json(412, err);
        res.json(row);
    });
});

/**
 * Post a single video
 */

router.post('/', function (req, res) {
    var id = req.body.id;
    var u_id = req.body.u_id;
    var url = req.body.url;

    var sqlRequest = "INSERT INTO 'videos' (id, u_id, url) " +
        "VALUES('" + id + "', '" + u_id + "', '" + url + "')"
    db.run(sqlRequest, function(err) {
        if (err) return res.json(412, err);
        res.json(true);
    });
});

/**
 * Delete a single video
 */

router.delete('/:id', function(req, res) {
    if(req.headers.token != "admin"){
        res.statusCode = 401;
        return res.json('Invalid token');
    }
    db.run("DELETE FROM videos WHERE id='" + req.params.id + "'", function(err) {
        if (err) return res.json(412, err);
        res.json(true);
    });
});

module.exports = router;