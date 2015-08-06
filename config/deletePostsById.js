var session = require('express-session');
var language = require('../language');
var db = require("../config/db");
var Entries = db.model('entries');

module.exports = function (req, res, next) {
  var id = req.params.id;
  Entries.remove({ _id: id }, function (err, success) {
    if (success) {
      Entries.find(function (err, posts) {
        if (req.session.language) {
          if (req.session.language == "tr") {
            res.render('error', {
              posts: posts,
              language: language.tr,
              username: req.sessionusername
            }
              );
          }
          else if (req.session.language == "de") {
            res.render('error', {
              posts: posts,
              language: language.de,
              username: req.sessionusername
            }
              );
          }
          else {
            res.render('error', {
              posts: posts,
              language: language.en,
              username: req.sessionusername
            }
              );
          }
        }
        else {
          res.render('error', {
            posts: posts,
            language: language.en,
            username: req.sessionusername
          }
            );
        }
      })
    }
  })
};