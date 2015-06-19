var express    	= require('express'),
    include     = require('include'),
	bodyParser 	= require('body-parser'),
 	router 		= require('./router.js');

var app = express();

console.info('configuring body parser...');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.info('configuring routes...');
app.use('/API', router);

console.info('starting application...');
app.listen(9000);
console.info('application started on port 9000');