var session = require('express-session');
var language = require('../language.js');
var db = require("../config/db");
var Entries = db.model('entries');
var express = require('express');

module.exports = function (req, res, next) {
  var id = req.params.id;
  Entries.find({ _id: id }, function (err, posts) {
    if (req.session.language) {
      if (req.session.language == "tr") {
        res.render('posts', {
          posts: posts,
          username: req.session.username,
          language: language.tr
        });
      }
      else if (req.session.language == "de") {
        res.render('posts', {
          posts: posts,
          username: req.session.username,
          language: language.de
        });
      }
      else {
        res.render('posts', {
          posts: posts,
          username: req.session.username,
          language: language.en
        });
      }

    }
    else {
      res.render('posts', {
        posts: posts,
        username: req.session.username,
        language: language.en
      });
    }
  })
};