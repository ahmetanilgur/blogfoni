var express = require('express');
var router = express.Router();
var db = require('../db');
var Mongo = db.model('entries');
/* GET home page. */
router.get('/', function (req, res, next) {
  Mongo.find(function (err, posts) {
    res.end('To delete a post you need to use the url localhost/delete/__id for the post__');
  })
});

router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  console.log(req.session.username);
    Mongo.remove({ _id: id }, function (err, success) {
      if (success) {
        console.log("deleted successfully");
        Mongo.find(function (err, posts) {
          res.render('mainPosts', { posts: posts , username:req.session.username});
        })
      }
    })
  
});


// router.get('/delete/:id', function(req,res,next){
//   var id = req.params.id;
//   mongo.remove({_id:id}, function(err,success){
//     if(success){
//       console.log("deleted successfully");
//        mongo.find( function (err, posts) {
//     res.render('posts', { posts: posts });
//   })
//     }
//   })
// })
module.exports = router;
