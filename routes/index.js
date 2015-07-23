var express = require('express');
var router = express.Router();
var db = require("../db");
var Mongo = db.model('entries');
var User = db.model('users');
var session = require('express-session');
/* GET home page. */
router.get('/', function (req, res, next) {
  console.dir(req);
  Mongo.find(function (err, posts) {
    console.log(posts)
    res.render('index', {
      posts: posts
    });
  });
});

router.post('/', function (req, res, next) {
  console.dir(req);
  var post = new Mongo({
    topic: req.body.topic,
    entry: req.body.entry,
    date: Date.now()
  })
  post.save(function (err, saved_post) {
    if (err) console.log(err);
    else {
      Mongo.find(function (err, posts) {
        res.render('index', { posts: posts });
      });
    }
  });
});

router.post('/registered', function (req, res, next) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });
  user.save(function (err, saved_post) {
    if (err) console.log(err);
    else {
      Mongo.find(function (err, posts) {
        res.render('index', { posts: posts });
      });
    }
  })
});

router.post('/logged', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  User.find({ username: username }, function (err, found) {
    if (err) {
      console.log(err);
    }
    else {
      req.session.username = username;
      Mongo.find(function (err, posts) {
        res.render('index', { posts: posts, username: username });
      });
    }
  });
});


module.exports = router;
