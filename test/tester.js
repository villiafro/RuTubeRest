
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

var express = require('express');
var router = express.Router();

var db = require('../models/database');

chai.use(chaiHttp);

describe("Routing", function() {

    var url = "http://localhost:3000";
    var token = "admin";

    describe("Account", function() {

        var profile = {
            id: 5,
            username: "villson",
            password: "villson"
        };

        it("getting users from database should give an array of users", function(done) {
            chai.request(url).get("/users").end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                done();
            });
        });

        it("creating user should should be successfull", function(done) {
            chai.request(url).post("/users").send(profile).end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.eql(true);
                done();
            });
        });

        it("creating the same user should fail", function(done) {
            chai.request(url).post("/users").send(profile).end(function(err, res) {
                res.should.have.status(412);
                res.should.be.json;
                done();
            });
        });

        it("deleting the newly created user should be successfull", function(done) {
            chai.request(url).delete("/users/5").set("Token", token).end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.eql(true);
                done();
            });
        });
    });

    describe("Users", function() {

        var favourite = {
            v_id: 1
        };

        var changeUserName = {
            username: "villson"
        };

        var rightUserName = {
            username: "villi"
        };

        var friend = {
            two_id: 2
        };

        it("getting user with id 0 should return the right user", function(done) {
            chai.request(url).get("/users/0").set("Token", token).end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].id.should.equal(0);
                res.body[0].username.should.equal("villi");
                done();
            });
        });

        it("adding a favourite video be successful", function(done) {
            chai.request(url).post("/users/0/favourites").set("Token", token).send(favourite).end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.eql(true);
            });
            chai.request(url).delete("/users/0/favourites").set("Token", token).send(favourite).end(function(err, res) {
                done();
            });
        });

        it("removing the newly listed favorite video should be successful", function(done) {
            chai.request(url).delete("/users/0/favourites").set("Token", token).send(favourite).end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.eql(true);
                done();
            });
        });

        it("changing username should be successful", function(done) {
            chai.request(url).put("/users/0/username").set("Token", token).send(changeUserName).end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.eql(true);
                done();
            });
        });

        it("the username should be changed in the database", function(done) {
            chai.request(url).get("/users/0").set("Token", token).end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].username.should.equal("villson");
                done();
            });
        });

        it("changing the username back to normal should be successful", function(done) {
            chai.request(url).put("/users/0/username").set("Token", token).send(rightUserName).end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.eql(true);
                done();
            });
        });

        it("adding a friend should should return status code 200", function(done) {
            chai.request(url).post("/users/0/friends").set("Token", token).send(friend).end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.eql(true);
                done();
            });
        });

        it("removing the newly listed friend should be successful", function(done) {
            chai.request(url).delete("/users/0/friends").set("Token", token).send(friend).end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.eql(true);
                done();
            });
        });
    });

    describe("Videos", function() {

        var video = {
            id: 2,
            u_id: 2,
            url: "https://www.youtube.com/watch?v=czL80l2X-L0"
        };

        it("adding a new video should should return status code 200", function(done) {
            chai.request(url).post("/videos").set("Token", token).send(video).end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.eql(true);
                done();
            });
        });

        it("should display the newly listed video in the video list", function(done) {
            chai.request(url).get("/videos").end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[2].id.should.equal(2);
                res.body[2].u_id.should.equal(2);
                res.body[2].url.should.equal("https://www.youtube.com/watch?v=czL80l2X-L0");
                done();
            });
        });

        it("should display the newly listed video on the channel", function(done) {
            chai.request(url).get("/videos/channel/2").end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].id.should.equal(2);
                res.body[0].u_id.should.equal(2);
                res.body[0].url.should.equal("https://www.youtube.com/watch?v=czL80l2X-L0");
                done();
            });
        });

        it("deleting the newly created video should be succesful", function(done) {
            chai.request(url).delete("/videos/2").set("Token", token).end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.eql(true);
                done();
            });
        });

        it("the deleted video should no longer by listed", function(done) {
            chai.request(url).get("/videos").end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                should.not.exist(res.body[2]);
                done();
            });
        });


    });
});