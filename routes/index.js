var express = require('express');
var router = express.Router();
var db = require("../db");
var Mongo = db.model('entries');
var User = db.model('users');
var session = require('express-session');
// var ses_user;
// var ses_pass;
/* GET home page. */
router.get('/', function (req, res, next) {
  console.dir(req);
  Mongo.find(function (err, posts) {
    console.log(posts)
    res.render('index', {
      posts: posts,
      username:req.session.username
    });
  });
});

router.post('/', function (req, res, next) {
  console.dir(req);
    if(!req.session.username){
    req.session.username="Anonymous"
  }
  var post = new Mongo({
    topic: req.body.topic,
    entry: req.body.entry,
    username: req.session.username,
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
  User.find({ username: username, password:password }, function (err, found) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Username: "+found[0].username+" \nPassword: "+found[0].password);
      req.session.username = username;
      // ses_user=username;
      Mongo.find(function (err, posts) {
        res.render('index', { posts: posts, username: req.session.username });
        console.log(req.session.username+" is registered as session.username")
      });
    }
  });
});


module.exports = router;
