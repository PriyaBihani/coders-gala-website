require('dotenv').config();
var app = require('./app');
var http = require('http');

var server = http.createServer(app);

/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || '3001';
app.set('port', port);

/**
 * Create HTTP server.
 */

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', () => {
	console.log('ERROR');
});
server.on('listening', () => {
	console.log(`listening on port ${port}`);
});

/**
 * Normalize a port into a number, string, or false.
 */
