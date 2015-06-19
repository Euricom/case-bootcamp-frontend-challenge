var express = require('express'),
	include = require('include'),
	config = include('config'),
	http = require("http");;

var router = express.Router();

router.get('/:apiKey/users', function(req, res, next){
	if(req.params.apiKey !== config.apiKey){
		return res.status(500).send('An error occured');
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

router.get('/:apiKey/send', function(req, res, next){
	if(req.params.apiKey !== config.apiKey || req.query.password !== 'DustSucker'){
		return res.status(500).send('An error occured');
	}

	if(!req.query.text || req.query.phoneNumer || req.query.senderTitle){
		return res.status(400).send('Please provide all data. For more information see documentation.');
	}

	var text = req.query.text,
		phoneNumber = req.query.phonenumber,
		senderTitle = req.query.sendertitle,
		url = 'http://klanten.bizzsms.nl/api/send?username=msdn&code=e1a388519e6b718e8a9c3c9e357cff95&text=' + text + '&phonenumbers=' + phoneNumber + ',phonenumber&sendertitle=' + senderTitle;

	http.get(url, function(response) {
		res.send('Sms send to ' + phoneNumber)
	}).on('error', function(error) {
		res.status(500).send(error.message);
	});
});

module.exports = router;