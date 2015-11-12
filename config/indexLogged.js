/**
* A module that redirects users to 
* index page if user has managed 
* to login into system
* using credentials
* checks whether username matches 
* with the password from the database
* @param {string} password
* @param {string} username
* 
*/
var db = require("../config/db");
var Entries = db.model('entries');
var User = db.model('users');
var session = require('express-session');
var language = require('../language.js');


module.exports = function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({ username:username }, function (err, found) {
    if (err) {
      console.log(err);
      res.render('error', {
        message: "DB connection error!",
            status: err,
            stack: "DB Connection was interrupted",
            error: err
      })
    }
    else {
      if(found==null){
           res.render('error', {
          error: {
            message: 'Username was not found',
            status: "Invalid info",
            stack: "Please go back to login page and try to login again."
          },
          language:language.en
        })
      }
      else if(found.isBanned==true){
        res.render('error', {
          error: {
            message: 'You have been banned!',
            status: "This account has been suspended by an admin",
            stack: "Please contact us if you think that it is a mistake"
          },
          language:language.en
        })        
      }
      else if ((found.password == password) && (found.isBanned==false || null)) {
        console.log("Username: " + found.username + " \nPassword: " + found.password);
        req.session.username = found.username;
        req.session.isBanned = found.isBanned;
        req.session.isAdmin = found.isAdmin;
        res.locals.isBanned=found.isBanned;
        // This line was using a db query to render index data, instead used redirect. A fine improvement. Instead of sending two queries at once, only one query seems to be working fine.
        res.redirect('../../');
      }
      else {
        res.render('error', {
          error: {
            message: 'User/pass mismatch',
            status: "The password you have entered does not match the username.",
            stack: "Please go back to login page and try to login again."
          },
          language:language.en
        })
      }
    }
  });
}