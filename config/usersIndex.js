/**
* A module to show a 404 error page in a nicer 
* way to those who tried to access '/users'
*/
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
          language: language.tr,
          message: error.tr.message
        }
          );
      }
      else if (req.session.language == "de") {
        res.render('error', {
          error: error.de.error,
          language: language.de,
          message: error.de.message

        }
          );
      }
      else {
        res.render('error', {
          error: error.en.error,
          language: language.en,
          message: error.en.message
        }
          );
      }
    }
    else {
      res.render('error', {
        error: error.en.error,
          language: language.en,
          message: error.en.message
      }
        );
    }
  })
}