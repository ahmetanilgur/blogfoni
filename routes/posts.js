var express = require('express');
var router = express.Router();
var db = require('../config/db');
var mongo = db.model('entries');
var language=require('../config/language.js')
/* GET home page. */
router.get('/', function (req, res, next) {
  mongo.find(function (err, posts) {
    res.render('index', {
      posts: posts,
      username: req.session.username
    });
  })
});

router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  mongo.find({ _id: id }, function (err, posts) {
    res.render('posts', {
      posts: posts,
      username: req.session.username
    });
  })
});
router.get('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  mongo.remove({ _id: id }, function (err, success) {
    if (success) {
      mongo.find(function (err, posts) {
        res.render('posts', {
          posts: posts,
          username: req.session.username
        });
      })
    }
  })
})
module.exports = router;