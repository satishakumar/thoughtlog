var mongoose = require("mongoose");

var thoughtSchema = mongoose.Schema({
	description : {
		type : String,
		required : true
	},
	created_by : {
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

var Thought = module.exports = mongoose.model('Thought', thoughtSchema);

// Get thoughts
module.exports.getThoughts = function(callback, limit){
	Thought.find(callback).limit(limit);
}

module.exports.createThought = function(callback,json){
	var thought = new Thought({
		description : json.description,
		created_by : json.created_by
	});
	thought.save(callback);
}