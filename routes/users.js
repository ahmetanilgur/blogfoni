var express = require('express');
var router = express.Router();
var db = require('../config/db');
var mongo = db.model('entries');
var language=require('../config/language.js')
/* GET home page. */
router.get('/', function (req, res, next) {
  mongo.find( function (err, posts) {
    res.render('error', { error: {
      status: "You have entered a bad url.",
      stack: "Please wander around safe places. No hackerish stuff."
      },
      message:"You are lost! I guess.."});
  })
});

router.get('/:username', function (req, res, next) {
  var username = req.params.username;
  mongo.find( {username:username},function (err, posts) {
    res.render('users', {
      username:username, 
      posts: posts });
  })
});
router.get('/delete/:id', function(req,res,next){
  var id = req.params.id;
  mongo.remove({_id:id}, function(err,success){
    if(success){
      console.log("deleted successfully");
       mongo.find( function (err, posts) {
    res.render('index', { posts: posts });
  })
    }
  })
})
module.exports = router;
