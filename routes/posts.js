var express = require('express');
var router = express.Router();
var db = require('../db');
var mongo = db.model('entries');
/* GET home page. */
router.get('/', function (req, res, next) {
  mongo.find( function (err, posts) {
    
    res.render('index', { 
      posts: posts  
      });
  })
});

router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  mongo.find( {_id:id},function (err, posts) {
    res.render('posts', { posts: posts });
  })
});
router.get('/delete/:id', function(req,res,next){
  var id = req.params.id;
  mongo.remove({_id:id}, function(err,success){
    if(success){
      console.log("deleted successfully");
       mongo.find( function (err, posts) {
    res.render('posts', { posts: posts });
  })
    }
  })
})
module.exports = router;
