var express = require('express');
var router = express.Router();
var db = require('../config/db');
var Mongo = db.model('entries');
var language = require('../language.js')
var deleteIndex = require("../config/deleteIndex.js")
var deletePostsById = require('../config/deletePostsById.js')
router.get('/', deleteIndex);
router.get('/:id', deletePostsById);
module.exports = router;