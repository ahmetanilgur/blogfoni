/**
* A page designed to hand out a 404 error in a nicer way.
*/
var session = require('express-session');
var language = require('../language');
var db = require("../config/db");
var Entries = db.model('entries');
var errors = require("../config/errors")

module.exports = function (req, res, next) {
  Entries.find(function (err, posts) {
    function Renderer() {
      if (req.session.language == "tr") {
        var lang = language.tr;
        var error = errors.tr.badUrl;
      }
      else if (req.session.language == "de") {
        lang = language.de;
        error = errors.de.badUrl;
      }
      else {
        lang = language.en;
        error = errors.en.badUrl;
      }
      var page = {
        posts: posts,
        language: lang,
        error: error,
      }
      return page;
    }
    var page = Renderer(req.session.language);
    res.locals.username = req.session.username;
    res.render('error', page);
  })
}