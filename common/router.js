var express = require('express');

function CommonRouter(controller) {    
	var router = express.Router();
	
	router.get('/', controller.getAll);
	
	return router;
}

module.exports = CommonRouter;