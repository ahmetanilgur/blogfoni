var session = require('express-session');
var language=require('../config/language.js');
var db = require("../config/db");
var Entries = db.model('entries');
var express = require('express');
var language=require('../config/language.js')

 module.exports=function (req, res, next) {
  Entries.find(function (err, posts) {
    if (req.session.language) {
      if (req.session.language == "tr") {
        res.render('index', {
          posts: posts,
          username: req.session.username,
          language: language.tr
        });
      }
      else if (req.session.language == "de") {
        res.render('index', {
          posts: posts,
          username: req.session.username,
          language: language.de
        });
      }
      else {
        res.render('index', {
          posts: posts,
          username: req.session.username,
          language: language.en
        });
      }
    }
    else {
          res.render('index', {
          posts: posts,
          username: req.session.username,
          language: language.en
        });
    }


  });
  if (req.session.username == undefined) {
    req.session.username = "";
    req.session.isAdmin = false;
    req.session.isBanned = false;

  }
  console.log(req.session.username)
};