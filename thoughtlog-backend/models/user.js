var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
	username : {
		type : String,
		required : true
	},
	password : {
		type : String,
		required : true
	},
	created_at : {
		type : Date,
		default : Date.now
	},
	updated_at : {
		type : Date,
		default : Date.now
	}
});

var User = module.exports = mongoose.model('User', userSchema);

// Get Users

module.exports.getUsers = function(callback, limit){
	User.find(callback).limit(limit);
}