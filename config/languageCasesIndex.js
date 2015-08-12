/**
 * @define Renderer decides whether language is tr, en or de
 * @param {list} lang refers to language stored in session.
 * @param {list} posts refers to posts sent by user.
 */

var session = require('express-session');
var db = require("../config/db");
var Entries = db.model('entries');
var language = require('../language.js');
var lang;
module.exports = function (req, res, next) {
  Entries.find(function (err, posts) {
    function Renderer() {
      if (req.session.language == "tr") {
       lang = language.tr;
      }
      else if (req.session.language == "de") {
        lang = language.de;
      }
      else {
        lang = language.en;
      }
      var page = {
        posts: posts,
        language: language.tr
      }
      return page;
    }
    var page = Renderer(req.session.language);
    res.locals.username = req.session.username;
    res.locals.isAdmin = req.session.isAdmin;
    res.locals.isBanned = req.session.isBanned;
    res.render('index', page);
  });
  if (typeof req.session.username == 'undefined') {
    req.session.username = "";
    req.session.isAdmin = false;
    req.session.isBanned = false;
  }
};