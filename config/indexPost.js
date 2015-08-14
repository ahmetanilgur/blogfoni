/**
* A module to post a blog-text to the db
* @param {object} post
*/
var db = require("../config/db");
var Entries = db.model('entries');
var User = db.model('users');
var session = require('express-session');
var language=require('../language.js');

module.exports=function (req, res, next) {
  console.dir(req);
  req.body.entry = req.body.entry.replace(/\r\n/g, "<br>");
  var post = new Entries({
    topic: req.body.topic,
    entry: req.body.entry,
    username: (!!req.session.username ? req.session.username : "Anonymous"),
    date: Date.now()
  });

  post.save(function (err, saved_post) {
    if (err) console.log(err);
    else {
      res.redirect('../');
    }
  });
}