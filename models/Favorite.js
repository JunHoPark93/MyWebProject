var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = mongoose.Schema({
	    hotelDistinct: {type: String,'default':''},
	    user_id: {type: String, 'default':''},
			houseName: {type: String, 'default':''},
			price: {type: String},
			introduction: {type: String},
	    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
	    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
});

	var Favorite = mongoose.model('Favorite', schema);

	module.exports = Favorite;
