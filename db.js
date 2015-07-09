var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogfoni');
var entrySchema = new mongoose.Schema({
	topic: String,
	entry: String
})
mongoose.model('entries', entrySchema);
module.exports = mongoose;