var db = require("../config/db");
var Entries = db.model('entries');
var Users = db.model('users');
var session = require('express-session');
var language = require('../language.js')


module.exports = function (req, res, next) {
	if (req.session.isAdmin) {
		Entries.find(function (err, posts) {
			Users.find(function (error, users) {
				if(req.session.language){
					if(req.session.language=="tr"){
						res.render('admin', {
							posts: posts,
							users: users,
							username: req.session.username,
							language: language.tr
						});
					}
					if(req.session.language=="de"){
						res.render('admin', {
							posts: posts,
							users: users,
							username: req.session.username,
							language: language.de
						});
					}
					else{
						res.render('admin', {
							posts: posts,
							users: users,
							username: req.session.username,
							language: language.tr
						});
					}
				}
					else{
						res.render('admin', {
							posts: posts,
							users: users,
							username: req.session.username,
							language: language.tr
						});
					}
			});
		});
	}
	else {if(req.session.language){
					if(req.session.language=="tr"){
							res.render('error', {
			message: 'Permission denied',
			error: {
				status: "You no look like an adminos.",
				stack: "Plz go awai."
			},
			language: language.tr
		})
					}
					else if(req.session.language=="de"){
							res.render('error', {
			message: 'Permission denied',
			error: {
				status: "You no look like an adminos.",
				stack: "Plz go awai."
			},
			language: language.de
		})
					}
					else{
							res.render('error', {
			message: 'Permission denied',
			error: {
				status: "You no look like an adminos.",
				stack: "Plz go awai."
			},
			language: language.en
		})
					}
					}else{
						
		res.render('error', {
			message: 'Permission denied',
			error: {
				status: "You no look like an adminos.",
				stack: "Plz go awai."
			},
			language: language.tr
		})
					}
	
	}
}