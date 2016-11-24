var express = require('express');
var User = require('../models/User');
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
router.get('/hotel', function(req, res, next) {
  res.render('hotel');
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
