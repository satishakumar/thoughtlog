// Dependencies
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require("cors");

var config = require("./config/environment")();

// var db = mongoose.connection;
// Mongo Connect
// mongoose.connect('mongodb://node:12345@localhost/thoughtlog');
mongoose.connect('mongodb://localhost/thoughtlog');
// mongoose.connect('mongodb://root:lwr8I6MBpEHC@ec2-35-154-178-237.ap-south-1.compute.amazonaws.com:27017/thoughtlog');


var expressSession = require('express-session');
var cookieParser = require('cookie-parser'); // the session is stored in a cookie, so we use this to parse it

//TODO : Authentication requests
var checkAuth = function (req, res, next) {
	whitelisturls = ['/api/users/login', '/api/users']
	if (req.session.user_id || (whitelisturls.includes(req.path) && req.method === 'POST')) {
		next();
	}else{
		res.send('You are not authorized to view this page');
	}
}

// Middlewares
app.use(cors({origin:true,credentials: true}));
app.use(cookieParser());
app.use(expressSession({secret:'somesecrettokenhere'}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// app.use(checkAuth)

// Models
Thought = require('./models/thought');
User = require('./models/user');

// Controllers
app.use('/api/thoughts', require('./controllers/thoughts'))
app.use('/api/users', require('./controllers/users'))

// Server Listen
var server = app.listen(config.port, function(){
	console.log('Express server listening on port ' + config.port);
});

var io = require('socket.io').listen(server);

// SocketIO
io.on('connection', function(socket){
  	
  	socket.on('join', function (data) {
  		// console.log('User connected : ' +data.username);
		socket.join(data.channel);
		socket.broadcast.to(data.channel).emit('notifications', {username: data.username, type: 'user'});
	});

	socket.on('newThought', function (data) {
  		// console.log('New thought posted : ');
		// io.sockets.in(socket.channelname).emit('notifications', {thoughtHash: data.thoughtHash, type:'thought'});
		socket.broadcast.to(data.channel).emit('notifications', {thoughtHash: data.thoughtHash, type:'thought'});
	});
});


