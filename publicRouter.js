var express = require('express'),
	include = require('include'),
	config = include('config'),
	crypto = require('crypto');

var router = express.Router();

router.get('/dBDiFG8MEkA7RB', function(req, res, next){
	config.sessionId = req.query.id;
	return res.send('Session key set: "' + config.sessionId + '"');
});

router.get('/create-session/:sessionId', function(req, res, next){
	if(req.params.sessionId !== config.sessionId){
		return res.status(500).send('An error occured');
	}

	var current_date = (new Date()).valueOf().toString();
	var random = Math.random().toString();
	config.apiKey = crypto.createHash('sha1').update(current_date + random).digest('hex');

	return res.send('Start url is: api/' + config.apiKey + '/users');
});

module.exports = router;