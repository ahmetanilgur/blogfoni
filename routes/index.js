var express = require('express');
var router = express.Router();
var db = require("../db");
var Entries = db.model('entries');
var User = db.model('users');
var session = require('express-session');
/* GET home page. */
router.get('/', function (req, res, next) {
  Entries.find(function (err, posts) {
    res.render('index', {
      posts: posts,
      username: req.session.username
    });
  });
  if(req.session.username==undefined){
    req.session.username="";
    req.session.isAdmin=false;
    req.session.isBanned=false;
  }
  console.log(req.session.username)
});

router.post('/', function (req, res, next) {
  console.dir(req);
  req.body.entry = req.body.entry.replace(/\r\n/g, "<br>");
  var post = new Entries({
    topic: req.body.topic,
    entry: req.body.entry,
    username: (!!req.session.username ? req.session.username : "Anonymous"),
    date: Date.now()
  });

  post.save(function (err, saved_post) {
    if (err) console.log(err);
    else {
      res.redirect('../');
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
      res.redirect('../');
    }
  })
});

router.post('/logged', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({ username: username }, function (err, found) {
    if (err) {
      console.log(err);
      res.render('error', {
        message: "Dörtyüzdört!",
        error: err
      })
    }
    else {
      if (found.password == password) {
        console.log("Username: " + found.username + " \nPassword: " + found.password);
        req.session.username = username;
        req.session.isBanned = found.isBanned;
        req.session.isAdmin = found.isAdmin;
        // This line was using a db query to render index data, instead used redirect. A fine improvement. Instead of sending two queries at once, only one query seems to be working fine.
        res.redirect('../');
      }
      else {
        res.render('error', {
          message: 'User/pass mismatch',
          error: {
            status: "The password you have entered does not match the username.",
            stack: "Please go back to login page and try to login again."
          }
        })
      }
    }
  });
});
router.get('/logout', function (req, res, next) {
  req.session.username = "";
  req.session.isAdmin = false;
  req.session.isBanned = false;
  res.redirect('../');
})


module.exports = router;
