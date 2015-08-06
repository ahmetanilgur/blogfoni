var express = require('express');
var router = express.Router();
var db = require('../config/db');
var Entries = db.model('entries');
var language=require('../language.js')
var languageCasesUsers=require('../config/languageCasesUsers.js')
var deleteUsersByUsername=require('../config/deleteUsersByUsername.js')
var usersIndex=require('../config/usersIndex.js')

router.get('/',usersIndex );
router.get('/:username', languageCasesUsers);
router.get('/delete/:id', deleteUsersByUsername)
module.exports = router;
