var express = require('express');
var router = express.Router();
var db = require("../config/db");
var Entries = db.model('entries');
var Users = db.model('users');
var session = require('express-session');
var language = require('../language.js')
var refreshAdminIndex = require('../config/refreshAdminIndex.js');
var adminDelete = require('../config/adminDelete.js');
var adminRegistered = require('../config/adminRegistered.js');
var adminLogged = require('../config/adminLogged.js');
/* GET home page. */

router.get('/', refreshAdminIndex);
router.get('/delete/:id', adminDelete);
router.post('/registered', adminRegistered);
router.post('/logged', adminLogged);
module.exports = router;
