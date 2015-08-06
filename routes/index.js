var express = require('express');
var router = express.Router();
var db = require("../config/db");
var Entries = db.model('entries');
var User = db.model('users');
var session = require('express-session');
var language=require('../config/language.js');
var languageCases=require('../config/languageCases.js');
/* GET home page. */


router.get('/', languageCases);

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
router.get('/tr', function (req, res, next) {
  req.session.language = "tr";
  res.redirect('../');
});
router.get('/de', function (req, res, next) {
  req.session.language = "de";
  res.redirect('../');
})
router.get('/en', function (req, res, next) {
  req.session.language = "en";
  res.redirect('../');
})

module.exports = router;
