var session = require('express-session');
var language = require('../language');
var db = require("../config/db");
var Entries = db.model('entries');

module.exports = function (req, res, next) {
  var username = req.params.username;
  Entries.find({ username: username }, function (err, posts) {
    if (req.session.language) {
      if (req.session.language == "tr") {
        res.render('users', {
          username: username,
          posts: posts,
          language: language.tr
        });
      }
      else if (req.session.language == "de") {
        res.render('users', {
          username: username,
          posts: posts,
          language: language.de
        });
      }
      else {
        res.render('users', {
          username: username,
          posts: posts,
          language: language.en
        });
      }
    }
    else {
      res.render('users', {
        username: username,
        posts: posts,
        language: language.en
      });
    }
  })
}