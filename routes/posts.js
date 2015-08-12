var express = require('express');
var router = express.Router();
var db = require('../config/db');
var Entries = db.model('entries');
var language = require('../language.js')
var languageCasesPosts=require('../config/languageCasesPosts.js');
var redirect=require('../config/redirect.js')
var deletePostsById=require('../config/deletePostsById.js')
/* GET home page. */
router.get('/', redirect)
router.get('/:id', languageCasesPosts);
router.get('/delete/:id',deletePostsById) 
module.exports = router;