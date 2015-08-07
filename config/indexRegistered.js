var db = require("../config/db");
var Entries = db.model('entries');
var User = db.model('users');
var session = require('express-session'); 
var language=require('../language.js');
 
 module.exports=function (req, res, next) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });
  user.save(function (err, saved_post) {
    if (err) console.log(err);
    else {
      res.redirect('../');
    }
  })
}