var express = require('express');
var router = express.Router();
var db = require("../db");
var Mongo = db.model('entries');
/* GET home page. */
router.get('/', function (req, res, next) {
  console.dir(req);

  db.model('entries').find(function (err, posts) {
    console.log(posts)
    res.render('index', { posts: posts });
  });
});

router.post('/', function (req, res, next) {
  console.dir(req);
  var post = new Mongo({
    topic: req.body.topic,
    entry: req.body.entry
  })
  post.save(function (err, saved_post) {
    if (err) console.log(err);
    else {
      db.model('entries').find(function (err, posts) {
        res.render('index', { posts: posts });
      });
    }
  });
});

module.exports = router;
