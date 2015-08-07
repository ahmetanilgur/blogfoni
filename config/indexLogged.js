var db = require("../config/db");
var Entries = db.model('entries');
var User = db.model('users');
var session = require('express-session'); 
var language=require('../language.js');

module.exports=function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({ username: username }, function (err, found) {
    if (err) {
      console.log(err);
      res.render('error', {
        message: "Dörtyüzdört!",
        error: err
      })
    }
    else {
      if (found.password == password) {
        console.log("Username: " + found.username + " \nPassword: " + found.password);
        req.session.username = username;
        req.session.isBanned = found.isBanned;
        req.session.isAdmin = found.isAdmin;
        // This line was using a db query to render index data, instead used redirect. A fine improvement. Instead of sending two queries at once, only one query seems to be working fine.
        res.redirect('../');
      }
      else {
        res.render('error', {
          message: 'User/pass mismatch',
          error: {
            status: "The password you have entered does not match the username.",
            stack: "Please go back to login page and try to login again."
          }
        })
      }
    }
  });
}