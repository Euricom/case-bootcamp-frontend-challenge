var CommonModel = require('../common/model.js');

var model = new CommonModel('users', {
  firstName: String,
  name: String,
  title: String,
  phone: String,
  description: Boolean
});

module.exports = model;