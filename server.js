var express    	= require('express'),
    include     = require('include'),
	bodyParser 	= require('body-parser'),
	cors 		= require('cors'),
	config 		= include('config'),
 	apiRouter 	= require('./apiRouter.js'),
    helpRouter  = require('./helpRouter.js'),
    hbs         = require('express-handlebars'),
    fs          = require('fs');

var app = express(),
	port = process.env.PORT || 5000;

app.engine('hbs', hbs({extname:'hbs'}));
app.set('view engine', 'hbs');


console.info('configuring body parser...');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

console.info('configuring routes...');

app.use('/api', apiRouter);
app.use('/help', helpRouter);
app.use('', function(req, res) {
    res.status(404).send("Page not found");
});

// read config from disk
fs.readFile("./config.json", 'utf8', function(err, json) {
    if (!json)
        return;
    var data = JSON.parse(json);
    config.sessionId = data.sessionId;
    config.apiKeys = data.apiKeys;
});

console.info('starting application...');
app.listen(port);
console.info('application started on port ' + port);
