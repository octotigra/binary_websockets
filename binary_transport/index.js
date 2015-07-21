var express = require('express');
var parser = require('body-parser');
var socketio = require('socket.io');

var app = express();
var server = app.listen(8080);
var io = socketio.listen(server);

var messages = [] ;

var staticDir = _directoryName = ('./public/');
app.use( parser.json() );
app.use( parser.urlencoded({extended: false}) );

app.get('/', function(req, res){
	res.sendfile(staticDir + 'index.html');
});

io.on('connection', function(socket){
	io.emmit('new user connected', messages);

	socket.on('message sent', function(msg){
		messages.push(msg);
		io.emmit('message sent', msg);
	});

});