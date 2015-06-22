var express = require('express'),
	include = require('include'),
	config = include('config'),
	http = require("http");;

var router = express.Router();

router.get('/', function(req, res, next){

    // GET /help?apiKey=api_abcdefghijk
	if(req.query.apiKey !== config.apiKey){
		return res.status(401).send('Invalid apiKey');
	}

	return res.render('help', {
        apiKey: config.apiKey
    });
});

module.exports = router;
