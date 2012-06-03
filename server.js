/**
 * Olives-SVG server
 * Copyright(c) 2012 Olivier Scherrer <pode.fr@gmail.com>
 * MIT Licensed
 */

// Required middleware
var connect = require("connect"),
	requirejs = require("requirejs"),
	http = require("http"),
	socketIO = require("socket.io"),
	olives = require("olives");

var io = socketIO.listen(http.createServer(connect()
	.use(connect.responseTime())
	.use(function (req, res, next) {
		res.setHeader("Server", "node.js/" + process.versions.node);
		res.setHeader("X-Powered-By", "OlivesJS + Connect + Passport + Socket.io")
		next();
	})
	.use(connect.static(__dirname + "/public"))
).listen(8000));

http.globalAgent.maxSockets = Infinity;

olives.registerSocketIO(io);