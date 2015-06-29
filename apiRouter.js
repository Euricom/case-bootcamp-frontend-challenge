var express = require('express'),
	include = require('include'),
	config = include('config'),
	http = require("http"),
    randomString = require('random-string');

var router = express.Router();

router.get('/dBDiFG8MEkA7RB', function(req, res, next){
    config.sessionId = req.query.id;
    config.apiKeys = [];
    config.writeToDisk();
    return res.send('Session key set: "' + config.sessionId + '"');
});

router.get('/create-session', function(req, res) {
    res.status(405).send({ code: 'Method not allowed'});
});

router.post('/create-session', function(req, res, next){
    // {
    //     sessionId: 123
    // }

    console.log(req.body.sessionId, config.sessionId);
    console.log(req.url);
    if(!req.body.sessionId){
        var result = {
            code: 'Bad Request',
            message: 'One or more validation failed',
            errors: []
        }
        result.errors.push('The sessionId is required');
        return res.status(400).send(result);
    }

    if(req.body.sessionId !== config.sessionId){
        var result = {
            code: 'Conflict',
            message: 'Invalid sessionId'
        }
        return res.status(409).send(result);
    }

    var apiKey = randomString({length: 10});
    config.apiKeys.push(apiKey);
    config.writeToDisk();
    var result = {
        helpUrl : req.protocol + '://' + req.get('host') + '/help?apiKey=' + apiKey,
        apiKey: apiKey
    }
    return res.send(result);
});


router.post('/users', function(req, res) {
    res.status(405).send({ code: 'Method not allowed'});
});

router.get('/users', function(req, res, next){
    // GET /api/users?apiKey=api_abcdefghijk
    console.log(req.query.apiKey, config.apiKeys);

	if(!config.hasAccess(req.query.apiKey)) {
		return res.status(401).send({ code: 'Unautorized', message: 'No or invalid apiKey'});
	}

	var result = [{
		'name': 'Van Hoye',
		'firstName': 'Wim',
		'title': 'General Manager',
		'phone': '0032495292010',
		'description': 'Etiam porta sem malesuada magna mollis euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
	},{
		'name': 'Cosemans',
		'firstName': 'Peter',
		'title': 'Bootcamp Instructor',
		'phone': '0032487938531',
		'description': 'Etiam porta sem malesuada magna mollis euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
	},{
		'name': 'Liesenborghs',
		'firstName': 'Stijn',
		'title': 'Bootcamp Coach/Manager',
		'phone': '0032472207545',
		'description': 'Etiam porta sem malesuada magna mollis euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
	},{
		'name': 'Toorman',
		'firstName': 'Liesbeth',
		'title': 'Office Manager',
		'phone': '0032472839431',
		'description': 'Etiam porta sem malesuada magna mollis euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
	}];

	return res.send(result);
});

router.get('/send-sms', function(req, res) {
    res.status(405).send({ code: 'Method not allowed'});
});

router.post('/send-sms', function(req, res, next){
    // POST /api/send-sms?apiKey=api_abcdefghijk
    // {
    //     username: 'msdn'
    //     password: '*********',
    //     text: 'this is the sms text',
    //     destination: '32487000000'
    // }

	if(!config.hasAccess(req.query.apiKey)) {
		return res.status(401).send({ code: 'Unauthorized', message: 'Invalid or missing apiKey'});
	}

    if (!req.body.username || !req.body.password || !req.body.text || !req.body.destination) {
        var result = {
            code: 'Bad Request',
            message: 'One or more validation failed',
            errors: []
        }
        if(!req.body.username){
            result.errors.push("The username is required");
        }

        if(!req.body.password){
            result.errors.push("The password is required");
        }

        if(!req.body.text){
            result.errors.push("The text is required");
        }

        if(!req.body.destination){
            result.errors.push("The destination is required");
        }
        return res.status(400).send(result);
    }

	var text = req.body.text,
		destination = req.body.destination,
        username = req.body.username,
        password = req.body.password,
        sender = req.body.sender,
		url = 'http://www.spryng.be/send.php?OPERATION=send&USERNAME=' + username + '&PASSWORD=' +
               password + '&DESTINATION=' + destination + '&ROUTE=BUSINESS&BODY=' + text + '&ALLOWLONG=1&SENDER=32487000000';

	http.get(url, function(response) {
        //console.log('STATUS: ' + response.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(response.headers));

        var output = '';
        response.on('data', function(chunk) {
            // You can process streamed parts here...
            output += chunk;
        }).on('end', function() {
            console.log('BODY: ' + output);
            if (output !== '1') {
                return res.status(409).send({ code: 'Conflict', message: "Failed to send sms", error: output });
            }
            return res.status(200).send('ok');
        })
	}).on('error', function(error) {
		res.status(500).send({ code: 'Internal Server Error', message: error});
	});
});

module.exports = router;
