
/**
* A module to show both posts and users in one page side by side
* and lets admins see banned/unbanned users
*/

var db = require("../config/db");
var errors = require('../config/errors.js')
var Entries = db.model('entries');
var Users = db.model('users');
var session = require('express-session');
var language = require('../language.js')

module.exports = function (req, res, next) {
	// If user logs in with an admin permit, redirect to admin page with the page data
	if (req.session.isAdmin) {
		Entries.find(function (err, posts) {
			Users.find(function (error, users) {
				function Renderer() {
					if (req.session.language == "tr") {
						var lang = language.tr;
					}
					else if (req.session.language == "de") {
						lang = language.de;
					}
					else {
						lang = language.en;
					}
					var page = {
						users: users,
						posts: posts,
						language: lang
					}
					return page;
				}
				var page = Renderer(req.session.language);
				res.locals.username = req.session.username;
				res.locals.isAdmin = req.session.isAdmin;
				res.locals.isBanned = req.session.isBanned;

				res.render('admin', page);
			})
		})
	}
	else {
								function Renderer() {
			if (req.session.language == "tr") {
				var lang = language.tr;
				var error = errors.tr.permissionDenied;
			}
			else if (req.session.language == "de") {
				lang = language.de;
				error = errors.de.permissionDenied
			}
			else {
				lang = language.en;
				error = errors.en.permissionDenied
			}
			var page = {
				error: error,
				language: lang
			}
			return page;
		}
		var page = Renderer(req.session.language);
		res.locals.username = req.session.username;
		res.locals.isAdmin = req.session.isAdmin;
		res.locals.isBanned = req.session.isBanned;

		res.render('error', page);

				}
}