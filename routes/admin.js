var express = require('express');
var router = express.Router();
var db = require("../config/db");
var Entries = db.model('entries');
var Users = db.model('users');
var session = require('express-session');
var language=require('../language.js')
/* GET home page. */
var refresh = function (req, res, next) {
  if (req.session.isAdmin) {
    Entries.find(function (err, posts) {
      Users.find(function (error, users) {
        res.render('admin', {
          posts: posts,
          users: users,
          username: req.session.username
        });
      });
    });
  }
  else {
          res.render('error', {
          message: 'Permission denied',
          error: {
            status: "You no look like an adminos.",
            stack: "Plz go awai."
          }
        })
  }
}
router.get('/', refresh);

router.get('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  Users.remove({ _id: id }, function (err, affectedRow) {
    if (err) console.log(err);
    else {
      Entries.find(function (err, posts) {
        Users.find(function (error, users) {
          res.render('admin', {
            posts: posts,
            users: users,
            username: req.session.username
          });
        });
      });
    }
  });
});

router.post('/registered', function (req, res, next) {
  var user = new Users({
    username: req.body.username,
    password: req.body.password
  });
  user.save(function (err, saved_post) {
    if (err) console.log(err);
    else {
      Entries.find(function (err, posts) {
        res.render('index', { posts: posts });
      });
    }
  })
});

router.post('/logged', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  Users.find({ username: username }, function (err, found) {
    if (err) {
      console.log(err);
      res.render('error', {
        message: "Dörtyüzdört!",
        error: err
      })
    }
    else {
      if (found[0].password == password) {
        console.log("Username: " + found[0].username + " \nPassword: " + found[0].password);
        req.session.username = username;
        Entries.find(function (err, posts) {
          res.render('index', { posts: posts, username: req.session.username });
          console.log(req.session.username + " is registered as session.username")
        });
      }
      else {
        res.render('error', {
          message: 'WRONG! (password)',
          error: {
            status: "the password you have entered does not match the username",
            stack: "please go back to login page and try with another password"
          }
        })
      }
    }
  });
});


module.exports = router;
