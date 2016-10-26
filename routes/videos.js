var express = require('express');
var router = express.Router();

var http = require('http');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/RuTube.sqlite');

/**
 * Get all videos from the database
 */
router.get('/', function(req, res) {
    db.all('SELECT * FROM videos', function(err, row) {
        if (err) return res.json(412, err);
        res.json(row);
    });
});

module.exports = router;