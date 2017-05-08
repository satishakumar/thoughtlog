var express = require('express')
  , router = express.Router()

router.get('/', function(req, res){
	Thought.getThoughts(function(err, thoughts){
		if(err){
			throw err;
		}
		res.json(thoughts);
	});
});

router.post('/', function(req, res){
	console.log(req.body)
	Thought.createThought(function(err, resp) {
		if (err) {
			throw err;
		}
		console.log(resp)
		res.json(resp);
	}, req.body);
});

module.exports = router