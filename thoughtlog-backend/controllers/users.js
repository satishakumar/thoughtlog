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

router.post('/login', function(req, res){
	User.getUserByUsername(function(err, resp) {
		if (err) {
			res.json({success : false, message : "Internal server error!, Please try after sometime."});
		}
		if(resp && req.body.password == resp.password){
			req.session.user_id = resp._id;
			res.json({success : true});
		}else{
			res.json({success : false, message : "Invalid login credentials!"});
		}
	}, req.body);
});


router.post('/', function(req, res){
	User.getUserByUsername(function(err, resp) {
		if (err) {
			res.json({success : false, message : "Internal server error!, Please try after sometime."});
		}
		if(resp == undefined){
			User.createUser(function(err, resp) {
				if (err) {
					res.json({success : false, message : "Internal server error!, Please try after sometime."});
				}
				res.json(resp);
			}, req.body);
		}else{
			res.json({success : false, message : "Username already taken!"});
		}
	}, req.body);
});

router.delete('/:_id',function(req,res){
	User.deleteUser(function(err, resp) {
		if (err) {
			throw err;
		}
		res.json(resp);
	}, req.params._id);
});


module.exports = router