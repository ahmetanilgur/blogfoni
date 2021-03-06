/**
* Config file storing database information
* @param {object} entrySchema
* @param {object} userSchema
*/

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogfoni');
var entrySchema = new mongoose.Schema({
	topic: String,
	entry: String,
	username: String,
	date: Date
})
var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	isBanned: Boolean,
	isAdmin: Boolean
})
mongoose.model('users', userSchema);
mongoose.model('entries', entrySchema);
module.exports = mongoose;
