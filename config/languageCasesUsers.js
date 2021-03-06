/**
* A module to show searched users
* @param {string} username
*/
var session = require('express-session');
var language = require('../language.js');
var db = require("../config/db");
var Entries = db.model('entries');


module.exports = function (req, res, next) {
  var username = req.params.username;
  Entries.find({ username: username }, function (err, posts) {
    function Renderer() {
      if (req.session.language == "tr") {
        var lang = language.tr
      }
      else if (req.session.language == "de") {
        lang = language.de
      }
      else {
        lang = language.en;
      }
      var page = {
        searchedUsername:username,
        posts: posts,
        language: lang
      }
      return page;
    }
    var page = Renderer(req.session.language);
    res.locals.username = req.session.username;
    res.render('users', page);
  })
}