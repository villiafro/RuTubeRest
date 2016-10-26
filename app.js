var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./routes/users');
var videos = require('./routes/videos');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Give the different views appropriate routes
 */

app.use('/users', routes);
app.use('/videos', videos);

module.exports = app;
