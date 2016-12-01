var express = require('express');
var User = require('../models/User');
var Hotel = require('../models/Hotel');
var Reserve = require('../models/Reserve');
var router = express.Router();

function needAuth(req, res, next) {
  if(req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signin', function(req, res, next) {
  res.render('signin');
});

// hotel list can be seen to anyone
router.get('/hotel', needAuth, function(req, res, next) {

  // 여기서 호텔 jade쪽으로 넘겨줄떄 예약 된 호텔들은 제외 시켜야 됨
  Hotel.find({}, function(err, hotels) {
    if(err) {
      return next(err);
    }
    //console.log(hotels);
    res.render('hotel', {hotels:hotels});
  });
});


// register nees an auth check
router.get('/hotelregister', needAuth, function(req, res, next) {
  res.render('hotelregister');
});

// register nees an auth check
router.get('/userProfile', needAuth, function(req, res, next) {
  res.render('userProfile');
});

router.get('/hotelReserve', function(req, res, next) {
  res.render('hotelReserve');
});


module.exports = router;
