var fs = require("fs");
var file = "data/RuTube.sqlite";
var exists = fs.existsSync(file);

/**
 * If no file is found, create a new sqlite database
 */

if(!exists) {
    console.log("Creating DB file.");
    fs.openSync(file, "w");
}

/**
 * Make a connection to the existing database
 */

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

/**
 * If a new database was created, initialize it with given tables
 */

if(!exists) {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY NOT NULL , firstname TEXT, lastname TEXT, username TEXT NOT NULL , password TEXT NOT NULL , email TEXT, admin BOOL)");
    db.run("CREATE TABLE videos (id INTEGER PRIMARY KEY  NOT NULL , u_id INTEGER NOT NULL , url TEXT NOT NULL )");
    db.run("CREATE TABLE friends (one_id INTEGER NOT NULL , two_id INTEGER NOT NULL , PRIMARY KEY (one_id, two_id))");
    db.run("CREATE TABLE favourites (v_id INTEGER NOT NULL , u_id INTEGER NOT NULL , PRIMARY KEY (v_id, u_id))");
}

module.exports = db;
