var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = mongoose.Schema({
	    houseName: {type: String, trim: true, 'default':''},
	    region: {type: String, trim:true, 'default':''},
	    writer: {type: String},
	    introduction: {type: String, trim: true},
      select: {type: String, 'default':''},
      price: {type: String, 'default':''},
			name: {type: String,'default':''},
			postnum1: {type: String,'default':''},
			postnum2: {type: String,'default':''},
			roadNum: {type: String,'default':'' },
			detailAddress: {type: String,'default':''},
	    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
	    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
	});

  var Hotel = mongoose.model('Hotel', schema);

  module.exports = Hotel;
