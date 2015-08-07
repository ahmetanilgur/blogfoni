var session = require('express-session');
var language = require('../language.js');
var db = require("../config/db");
var Entries = db.model('entries');
var language = require('../language.js')

module.exports = function (req, res, next) {
  getUsernameFromPost();
  function getUsernameFromPost() {
    Entries.findOne({ _id: req.params.id }, function (err, data) {
      console.log(data.username);
      if (data.username == req.session.username || req.session.isAdmin == true) {
        Entries.remove({ _id: req.params.id }, function (err, success) {
          if (!err) {
            Entries.find(function (err, posts) {
              res.redirect('../../');
            })
          }
        })
      }
      else {
        res.render('error', {
          error: {
            status: "You do not have the permission to delete posts of others.",
            stack: "Access denied."
          },
          message: "Shit happens :(",
          language:language.tr
        })
      }
    })
  }
}