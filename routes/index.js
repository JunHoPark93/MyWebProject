var express = require('express');
var User = require('../models/User');
var Hotel = require('../models/Hotel');
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
  // var db = req.db;
  // var collection = db.get('hotels');
  // collection.find({},{},function(err, hotels) {
  //   res.render('hotel', {"hotels":hotels});
  // }); // pass hotel list
  // var ses = req.session;
  // var userId = ses.passport.user;
  //
  // var userName;
  // var user;

  // User.findById(userId, function(err, getuser) {
  //   if(err) {
  //     return next(err);
  //   }
  //   userName = getuser.name;
  // });

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

module.exports = router;
