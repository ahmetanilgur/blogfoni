var db = require("../config/db");
var Entries = db.model('entries');
var Users = db.model('users');
var session = require('express-session');
var language = require('../language.js')

module.exports = function (req, res, next) {
  // Get the ID parameter from front-face and use it in delete query on mongoose
  var id = req.params.id;
  Users.remove({ _id: id }, function (err, affectedRow) {
    if (err) console.log(err);
    else {
      Entries.find(function (err, posts) {
        Users.find(function (error, users) {
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
        posts: posts,
        language: lang,
        users:users
      }
      return page;
    }
    var page = Renderer(req.session.language);
    res.locals.username = req.session.username;
    res.render('admin', page);
        });
      });
    }
  });
}