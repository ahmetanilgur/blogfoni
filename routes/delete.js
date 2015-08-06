var express = require('express');
var router = express.Router();
var db = require('../config/db');
var Mongo = db.model('entries');
var language=require('../config/language.js')
/* GET home page. */
router.get('/', function (req, res, next) {
  Mongo.find(function (err, posts) {
    res.render('error',{error:{status:"To delete a post you need to use the url localhost/delete/id for the post"}
      });
  })
});
router.get('/:id', function (req, res, next) {
   getUsernameFromPost();
  function getUsernameFromPost() {
    Mongo.findOne({ _id: req.params.id }, function (err, data) {
      console.log(data.username);
      if (data.username == req.session.username || req.session.isAdmin==true) {
        Mongo.remove({ _id: req.params.id }, function (err, success) {
          if (!err) {
            Mongo.find(function (err, posts) {
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
          message: "Shit happens :("
        })
      }
    })
  }
});
module.exports = router;
