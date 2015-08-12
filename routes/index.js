var express = require('express');
var router = express.Router();
var db = require("../config/db");
var Entries = db.model('entries');
var User = db.model('users');
var session = require('express-session');
var language = require('../language.js');
var languageCasesIndex = require('../config/languageCasesIndex.js');
var indexPost = require('../config/indexPost.js');
var indexRegistered = require('../config/indexRegistered.js');
var indexLogged = require('../config/indexLogged.js');

/* GET home page. */


router.get('/', languageCasesIndex);

router.post('/', indexPost);

router.post('/registered', indexRegistered);

router.post('/logged', indexLogged);

router.get('/logout', function (req, res, next) {
  req.session.username = "";
  req.session.isAdmin = false;
  req.session.isBanned = false;
  res.redirect('../');
})
router.get('/tr', function (req, res, next) {
  req.session.language = "tr";
  res.redirect('../');
});
router.get('/de', function (req, res, next) {
  req.session.language = "de";
  res.redirect('../');
})
router.get('/en', function (req, res, next) {
  req.session.language = "en";
  res.redirect('../');
})
router.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});


module.exports = router;
