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
	Thought.createThought(function(err, resp) {
		if (err) {
			throw err;
		}
		res.json(resp);
	}, req.body);
});

router.delete('/:_id',function(req,res){
	Thought.deleteThought(function(err, resp) {
		if (err) {
			throw err;
		}
		res.json(resp);
	}, req.params._id);
});

module.exports = router