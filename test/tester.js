var expect  = require("chai").expect;
var request = require("request");
var http = require("http");

var express = require('express');
var router = express.Router();

//var http = require('http');
//var express = require('express');
//var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database('data/RuTube.sqlite');

describe("Routing", function() {

    describe("Users", function() {

        it("getting users from database should returns status code 200", function(done) {
            var url = "http://localhost:3000/users";
            request(url, function(err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });

        it("getting user 0 should return the right user from database", function(done) {
            var url = "http://localhost:3000/users/0";
            request(url, function(err, res, body) {
                expect(body).to.equal('[{"id":0,"firstname":"Vilhjalmur","lastname":"Hannesson","username":"villi","password":"villi","email":"villi@gmail.com","admin":1}]');
                done();
            });
        });
    });
});