var express     	= require('express'),
    userRouter      = require('./users/router.js');

var router = express.Router();

router.use('/users', userRouter);

module.exports = router;