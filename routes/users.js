var express = require('express');
var router = express.Router();
var db = require('../db');
var mongo = db.model('entries');
/* GET home page. */
router.get('/', function (req, res, next) {
  mongo.find( function (err, posts) {
    res.render('users', { posts: posts });
  })
});

router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  mongo.find( {_id:id},function (err, posts) {
    res.render('users', { posts: posts });
  })
});

module.exports = router;