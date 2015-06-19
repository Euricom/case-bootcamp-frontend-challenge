var mongoose = require('mongoose');

function Model(name, schema){
	var Schema = new mongoose.Schema(schema);
	var model = mongoose.model(name, Schema);
	return model;
}

module.exports = Model;