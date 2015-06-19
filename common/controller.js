var responder = require('./responder.js');

function CommonController()  {
	return {
		getAll: function(req, res){
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

			responder.respond(res, result);
		}	
	}
}

module.exports = CommonController;