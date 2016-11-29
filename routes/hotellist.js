var express = require('express'),
    User = require('../models/User'),
    Hotel = require('../models/Hotel'),
    Reserve = require('../models/Reserve');
var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("auth");
    next();
  } else {
    res.status(401).json({message: 'Not authorized'});
  }
}


router.get('/', function (req, res, next) {
  // 여기서 디비 요청해서 예약늘려야되
  console.log('hotellist.js진입');
});

// _id받아서 객체 찾은 후 reserve페이지로 던지고 페이지에서 받아서 뿌리고 예약되면
// 예약 테이블에 추가할 것임
router.post('/:id', function(req, res, next) {
  Hotel.findById(req.params.id, function(err, hotel) {
    if(err) {
      return next(err);
    }

    res.render('hotelReserve', {hotel: hotel});
  });
});

router.post('/send/:id', function(req, res, next) {

  var range = req.body.daterange;
  console.log(range);

  Hotel.findById(req.params.id, function(err, hotel) {
    if(err) {
      return next(err);
    }

    var newReserve = new Reserve({
      houseDistinct : hotel._id,
      houseName : hotel.houseName,
      dateRange : range,
      name : hotel.name
    }); // reserved, approved had default values

    newReserve.save(function(err) {
      if(err){
        next(err);
      } else {
        req.flash('success', '예약 완료dd');
      }
    });

    res.redirect('/');
  });
});


module.exports = router;
