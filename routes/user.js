var express = require('express');
var router = express.Router();
var db = require('../models/database');

/**
 * Get user from database by id
 */

router.get('/:id', function(req, res) {
    if(req.headers.token != "admin"){
        res.statusCode = 401;
        return res.json('Invalid token');
    }
    db.all("SELECT * FROM users WHERE id='" + req.params.id + "'", function(err, row) {
        if (err) return res.json(412, err);
        res.json(row);
    });
});

/**
 * Delete user from database
 */

router.delete('/:id', function(req, res) {
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
 * Get users list of favorite videos
 */

router.get('/:id/favourites', function (req, res) {
    if(req.headers.token != "admin"){
        res.statusCode = 401;
        return res.json('Invalid token');
    }
    db.all("SELECT * FROM favourites WHERE u_id='" + req.params.id + "'", function(err, row) {
        if (err) return res.json(412, err);
        res.json(row);
    });
});

/**
 * Get users friend list
 */

router.get('/:id/friends', function (req, res) {
    if(req.headers.token != "admin"){
        res.statusCode = 401;
        return res.json('Invalid token');
    }
    db.all("SELECT * FROM friends WHERE one_id='" + req.params.id + "' OR two_id ='" + req.params.id + "'", function(err, row) {
        if (err) return res.json(412, err);
        res.json(row);
    });
});

module.exports = router;