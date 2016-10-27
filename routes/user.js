var express = require('express');
var router = express.Router();
var db = require('../models/database');

function getUserById(id) {
    db.all("SELECT password FROM users WHERE id='" + id + "'", function (err, row) {
        if (err) return null;
        return row[0].password;
    });
}

/**
 * Get user from database by id
 * using: http://localhost:3000/users/{id}
 */

router.get('/:id', function(req, res) {
    var userid = getUserById(req.params.id);
    if(req.headers.token !== "admin" && req.headers.token !== userid){
        res.statusCode = 401;
        return res.json('Invalid token');
    }
    db.all("SELECT * FROM users WHERE id='" + req.params.id + "'", function(err2, row2) {
        if (err2) return res.json(412, err2);
        res.json(row2);
    });
});

/**
 * Delete user from database
 * using: http://localhost:3000/users/{id}
 */

router.delete('/:id', function(req, res) {
    var userid = getUserById(req.params.id);
    if(req.headers.token !== "admin" && req.headers.token !== userid){
        res.statusCode = 401;
        return res.json('Invalid token');
    }
    db.run("DELETE FROM users WHERE id='" + req.params.id + "'", function (err) {
        if (err) return res.json(412, err);
        res.json(true);
    });
});

/**
 * Change username and/or password of user
 * using: http://localhost:3000/users/{id}/username
 */

router.put('/:id/username', function(req, res){
    var userid = getUserById(req.params.id);
    if(req.headers.token !== "admin" && req.headers.token !== userid){
        res.statusCode = 401;
        return res.json('Invalid token');
    }
    db.run("UPDATE users SET username='" + req.body.username + "' WHERE id='" + req.params.id + "'", function(err) {
        if (err) return res.json(412, err);
        res.json(true);
    });
});

/**
 * Change password of user
 * using: http://localhost:3000/users/{id}/password
 */
router.put('/:id/password', function(req, res){
    var userid = getUserById(req.params.id);
    if(req.headers.token !== "admin" && req.headers.token !== userid){
        res.statusCode = 401;
        return res.json('Invalid token');
    }
    db.run("UPDATE users SET password='" + req.body.password + "' WHERE id='" + req.params.id + "'", function(err) {
        if (err) return res.json(412, err);
        res.json(true);
    });
});

/**
 * Get users list of favorite videos
 * using: http://localhost:3000/users/{id}/favourites
 */

router.get('/:id/favourites', function (req, res) {
    var userid = getUserById(req.params.id);
    if(req.headers.token !== "admin" && req.headers.token !== userid){
        res.statusCode = 401;
        return res.json('Invalid token');
    }
    var query = "SELECT * FROM videos " +
                "JOIN favourites ON videos.id = favourites.v_id " +
                "WHERE favourites.u_id='" + req.params.id + "'";
    db.all(query, function(err, row) {
        if (err) return res.json(412, err);
        res.json(row);
    });
});

/**
 * Add a new favourite video to database
 * using: http://localhost:3000/users/{id}/favourites
 */

router.post('/:id/favourites', function(req, res) {
    var userid = getUserById(req.params.id);
    if(req.headers.token !== "admin" && req.headers.token !== userid){
        res.statusCode = 401;
        return res.json('Invalid token');
    }
    var u_id = req.params.id;
    var v_id = req.body.v_id;

    var sqlRequest = "INSERT INTO 'favorites' (one_id, two_id) " +
        "VALUES('" + u_id + "', '" + v_id + "')";
    db.run(sqlRequest, function(err) {
        if (err) return res.json(412, err);
        res.json(true);
    });
});

/**
 * Delete a favourite video from database
 * using: http://localhost:3000/users/{id}/favourites
 */

router.delete('/:id/favourites', function(req, res) {
    var userid = getUserById(req.params.id);
    if(req.headers.token !== "admin" && req.headers.token !== userid){
        res.statusCode = 401;
        return res.json('Invalid token');
    }
    db.run("DELETE FROM favourites WHERE u_id='" + req.params.id + "' AND v_id ='" + req.body.v_id + "'", function(err) {
        if (err) return res.json(412, err);
        res.json(true);
    });
});

/**
 * Get users friend list from database
 * using: http://localhost:3000/users/{id}/friends
 */

router.get('/:id/friends', function (req, res) {
    var userid = getUserById(req.params.id);
    if(req.headers.token !== "admin" && req.headers.token !== userid){
        res.statusCode = 401;
        return res.json('Invalid token');
    }
    var query = "SELECT id,firstname,lastname,username,email FROM users " +
                "JOIN friends ON friends.two_id = users.id " +
                "WHERE friends.one_id='" + req.params.id + "'";
    db.all(query, function(err, row) {
        if (err) return res.json(412, err);
        res.json(row);
    });
});

/**
 * Add friend to users friend list
 * using: http://localhost:3000/users/{id}/friends
 */

router.post('/:id/friends', function(req, res) {
    var userid = getUserById(req.params.id);
    if(req.headers.token !== "admin" && req.headers.token !== userid){
        res.statusCode = 401;
        return res.json('Invalid token');
    }
    var one_id = req.params.id;
    var two_id = req.body.two_id;

    var sqlRequest = "INSERT INTO 'friends' (one_id, two_id) " +
        "VALUES('" + one_id + "', '" + two_id + "')";
    var sqlRequst2 = "INSERT INTO 'friends' (one_id, two_id) " +
        "VALUES('" + two_id + "', '" + one_id + "')";
    db.run(sqlRequest, function(err) {
        if (err) return res.json(412, err);
        db.run(sqlRequst2, function(err2) {
            if (err2) return res.json(412, err2);
            res.json(true);
        });
    });
});

/**
 * Delete a a friend from friend list
 * using: http://localhost:3000/users/{id}/friends
 */

router.delete('/:id/friends', function(req, res) {
    var userid = getUserById(req.params.id);
    if(req.headers.token !== "admin" && req.headers.token !== userid){
        res.statusCode = 401;
        return res.json('Invalid token');
    }
    db.run("DELETE FROM friends WHERE one_id='" + req.params.id + "' AND two_id ='" + req.body.two_id + "'", function(err) {
        if (err) return res.json(412, err);
        db.run("DELETE FROM friends WHERE one_id='" + req.body.two_id + "' AND two_id ='" + req.params.id + "'", function(err) {
            if (err) return res.json(412, err);
            res.json(true);
        });
    });
});

module.exports = router;