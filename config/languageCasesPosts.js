/**
* A module to show posts which are stored in the db
* @param {string} id
*/
var session = require('express-session');
var language = require('../language.js');
var db = require("../config/db");
var Entries = db.model('entries');
var express = require('express');


module.exports = function (req, res, next) {
  var id = req.params.id;
  Entries.find({ _id: id }, function (err, posts) {
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
        language: lang
      }
      return page;
    }
    var page = Renderer(req.session.language);
    res.locals.username = req.session.username;
    res.render('posts', page);
  })
};