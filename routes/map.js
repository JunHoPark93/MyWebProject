var express = require('express'),
    User = require('../models/User'),
    Hotel = require('../models/Hotel');

var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("auth");
    next();
  } else {
    res.status(401).json({message: 'Not authorized'});
  }
}

router.post('/:id', function(req, res, next) {
  Hotel.findById(req.params.id, function(err, hotel) {
    if(err) {
      return next(err);
    }

    res.render('map', {hotel: hotel});
  });
});



module.exports = router;
