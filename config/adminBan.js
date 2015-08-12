var db = require("../config/db");
var Entries = db.model('entries');
var Users = db.model('users');
var session = require('express-session');
var language = require('../language.js')

module.exports = function (req, res, next) {
  // Get the ID parameter from front-face and use it in delete query on mongoose
  var id = req.params.id;
  Users.findOne({ _id: id }, function (err, doc) {
    if (err) console.log(err);
    else {
      doc.isBanned = true;
      doc.save();
      res.redirect('../../admin');
    }
  });
}