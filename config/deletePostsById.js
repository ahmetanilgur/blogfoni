/**
* A module to delete a post of any users 
* RESTful style.
* @function getUsernameFromPost
* @param {string} id
*/
var session = require('express-session');
var language = require('../language.js');
var db = require("../config/db");
var Entries = db.model('entries');
var language = require('../language.js')


module.exports = function (req, res, next) {
  getUsernameFromPost(); // Post ID kullanarak username döndürür.
  function getUsernameFromPost() {
    Entries.findOne({ _id: req.params.id }, function (err, data) {
      console.log(data.username);
      if (data.username == req.session.username || req.session.isAdmin == true) { 
        // ID ile bulduğumuz username, session'da kayıtlı olan username'e eşit ise true.
        Entries.remove({ _id: req.params.id }, function (err, success) {
          if (!err) {
            Entries.find(function (err, posts) {
              res.redirect('../../'); 
              // Hata yoksa indexe gönder.
            })
          }
        })
      }
      else {
        res.render('error', {
          error: {
            message: "Shit happens :(",
            status: "You do not have the permission to delete posts of others.",
            stack: "Access denied."
          },  
          language:language.en
        })
      }
    })
  }
}