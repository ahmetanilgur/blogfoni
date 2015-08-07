var db = require("../config/db");
var Entries = db.model('entries');
var Users = db.model('users');
var session = require('express-session');
var language = require('../language.js')

module.exports=function (req, res, next) {
  var user = new Users({
    username: req.body.username,
    password: req.body.password
  });
  user.save(function (err, saved_post) {
    if (err) console.log(err);
    else {
      Entries.find(function (err, posts) {
        res.redirect('../../');
      });
    }
  })
}