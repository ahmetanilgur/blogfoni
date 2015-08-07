var session = require('express-session');
var language = require('../language');
var db = require("../config/db");
var Entries = db.model('entries');
var error = require("../config/errors")

module.exports = function (req, res, next) {
  Entries.find(function (err, posts) {
    if (req.session.language) {
      if (req.session.language == "tr") {
        res.render('error', {
          error: error.tr.error,
          posts: posts,
          language: language.tr,
          username: req.sessionusername
        }
          );
      }
      else if (req.session.language == "de") {
        error: error.de.error,
        res.render('error', {
          posts: posts,
          language: language.de,
          username: req.sessionusername
        }
          );
      }
      else {
        res.render('error', {
          error: error.en.error,
          posts: posts,
          language: language.en,
          username: req.sessionusername
        }
          );
      }
    }
    else {
      res.render('error', {
        error: error.en.error,
        posts: posts,
        language: language.en,
        username: req.sessionusername
      }
        );
    }
  })
}