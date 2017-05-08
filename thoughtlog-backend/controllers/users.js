var express = require('express')
  , router = express.Router()


router.get('/', function(req, res){
	User.getUsers(function(err, users){
		if(err){
			throw err;
		}
		res.json(users);
	});
});


module.exports = router