var responder = {
	respond: function(res, data) {		
		if (!data)
			res.status(500).json({msg: 'something went wrong'});
		else
			res.json(data);
	}
}

module.exports = responder;