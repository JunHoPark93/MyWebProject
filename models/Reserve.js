var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = mongoose.Schema({
	    houseName: {type: String, trim: true, 'default':''},
      houseDistinct: {type: String},
	    name: {type: String},
	    introduction: {type: String, trim: true},
      reserved: {type: String, 'default':'N'},
      approved: {type: String, 'default':'N'},
	    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
	    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
	});

  var Reserve = mongoose.model('Reserve', schema);

  module.exports = Reserve;
