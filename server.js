var express    	= require('express'),
    include     = require('include'),
	bodyParser 	= require('body-parser'),
	cors 		= require('cors'),
	config 		= include('config'),
 	apiRouter 	= require('./apiRouter.js'),
    helpRouter  = require('./helpRouter.js'),
    hbs         = require('express-handlebars');

var app = express(),
	port = process.env.PORT || 5000;

app.engine('hbs', hbs({extname:'hbs'}));
app.set('view engine', 'hbs');


console.info('configuring body parser...');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

console.info('configuring routes...');

// http://server/public/dBDiFG8MEkA7RB
// http://server/public/create-session/:sessionId
// http://server/api/:apiKey/users
// http://server/help/:apiKey

// GET http://server/api/dBDiFG8MEkA7RB
// POST http://server/api/create-session
// GET http://server/api/:apiKey/users

// POST http://server/api/:apiKey/send-sms


// GET http://server/help/:apiKey


//app.use('/', publicRouter);
app.use('/api', apiRouter);
app.use('/help', helpRouter);
app.use('', function(req, res) {
    res.status(404).send("Page not found");
});

console.info('starting application...');
app.listen(port);
console.info('application started on port ' + port);
