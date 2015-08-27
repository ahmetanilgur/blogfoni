/**
 * @define Renderer decides whether language is tr, en or de
 * @param {string} lang refers to language stored in session.
 * @param {object} posts refers to posts sent by user.
 * @param {object} page Renderer object
 */

var session = require('express-session');
var db = require("../config/db");
var Entries = db.model('entries');
var language = require('../language.js');
var lang;


module.exports = function (req, res, next) {
  Entries.find(function (err, posts) {
    function Renderer(tempLang) {
      if (tempLang == "tr") {
        lang = language.tr;
      }
      else if (tempLang == "de") {
        lang = language.de;
      }
      else {
        lang = language.en;
      }
      var pageData = {
        posts: posts,
        language: lang
      }
      return pageData;
    }
    res.locals.username = req.session.username;
    res.locals.isAdmin = req.session.isAdmin;
    res.locals.isBanned = req.session.isBanned;
    var indexPage = Renderer(req.session.language);
    res.render('index', indexPage);
  });
  if (typeof req.session.username == 'undefined') {
    req.session.username = "";
    req.session.isAdmin = false;
    req.session.isBanned = false;
  }
};

