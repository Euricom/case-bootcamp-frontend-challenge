var CommonRouter    = require('../common/router.js'),
    controller  	= require('./controller.js');
    
var router = new CommonRouter(controller);

module.exports = router;