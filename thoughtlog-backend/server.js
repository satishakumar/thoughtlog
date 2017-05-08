// Dependencies
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require("cors");

var config = require("./config/environment")();

// Mongo Connect
mongoose.connect('mongodb://localhost/thoughtlog');
var db = mongoose.connection;

// Models
Thought = require('./models/thought');
User = require('./models/user');

// Middlewares
app.use(cors({origin:true,credentials: true}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Routes

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
  		console.log('User connected : ' +data.username);
		socket.join(data.channel);
		socket.broadcast.to(data.channel).emit('notifications', {username: data.username, type: 'user'});
	});

	socket.on('newThought', function (data) {
  		console.log('New thought posted : ');
		// io.sockets.in(socket.channelname).emit('notifications', {thoughtHash: data.thoughtHash, type:'thought'});
		socket.broadcast.to(data.channel).emit('notifications', {thoughtHash: data.thoughtHash, type:'thought'});
	});
});


