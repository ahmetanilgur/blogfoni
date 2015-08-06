var session = require('express-session');
var language = require('../language');
var db = require("../config/db");
var Entries = db.model('entries');

module.exports = function (req, res, next) {
  var id = req.params.id;
  Entries.remove({ _id: id }, function (err, success) {
    if (success) {
      Entries.find(function (err, posts) {
        res.render('index', { posts: posts });
      })
    }
  })
}