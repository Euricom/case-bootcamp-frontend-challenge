var express    	= require('express'),
    include     = require('include'),
	bodyParser 	= require('body-parser'),
	cors 		= require('cors'),
	config 		= include('config'),
 	apiRouter 	= require('./apiRouter.js'),
 	publicRouter 	= require('./publicRouter.js');

var app = express();

console.info('configuring body parser...');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

console.info('configuring routes...');
app.use('/public', publicRouter);
app.use('/api', apiRouter);

console.info('starting application...');
app.listen(9000);
console.info('application started on port 9000');