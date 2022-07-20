const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const appsSchema = new Schema({
	gameName: {
		type: String, 
		erquired: true
	},
	url: {
		type: String, 
		erquired: true
	},
	published: {
		type: String, 
		erquired: true
	},
	note: {
		type: String, 
		erquired: true
	}
});

const Applist = mongoose.model('Applist', appsSchema);

module.exports = Applist;