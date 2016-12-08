var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = mongoose.Schema({
	    houseName: {type: String, trim: true, 'default':''},
      houseDistinct: {type: String},
	    name: {type: String}, // 등록자 이름
			customerId: {type: String},
      reserved: {type: String, 'default':'N'},
      approved: {type: String, 'default':'N'},
			dateRange: {type: String},
	    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
	    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
	});

  var Reserve = mongoose.model('Reserve', schema);

  module.exports = Reserve;
