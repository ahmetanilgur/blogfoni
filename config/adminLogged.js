var db = require("../config/db");
var Entries = db.model('entries');
var Users = db.model('users');
var session = require('express-session');
var language = require('../language.js')

/**
* A module for admins to log in (to be implemented in the future)
* @param {string} username
* @param {string} password
*/

module.exports=function (req, res, next) {
  // Get username and password from front
  var username = req.body.username;
  var password = req.body.password;
  Users.find({ username: username }, function (err, found) {
    //if not found redirect to error page.
    if (err) {
      console.log(err);
      res.render('error', {
        message: "404!!",
        error: err,
        language:language.en
      })
    }
    else {
      // if the password found in database matches the one in param, grant access.
      if (found[0].password == password) {
        console.log("Username: " + found[0].username + " \nPassword: " + found[0].password);
        req.session.username = username;
        Entries.find(function (err, posts) {
          res.render('index', { 
            posts: posts, 
            username: req.session.username,
            language:language.en
            });
        });
      }
      else {
        // in case of no match, error page.
        res.render('error', {
          message: 'WRONG! (password)',
          error: {
            status: "the password you have entered does not match the username",
            stack: "please go back to login page and try with another password"
          },
           language:language.en
        })
      }
    }
  });
}