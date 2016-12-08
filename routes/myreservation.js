var express = require('express'),
    User = require('../models/User'),
    Hotel = require('../models/Hotel'),
    Reserve = require('../models/Reserve');
var router = express.Router();


function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}

router.get('/', needAuth, function(req, res, next) {
  var ses = req.session;
  var userId = ses.passport.user;
  // userid와 approved Y인 것을 찾아서 넘긴다

  Reserve.find({customerId: userId , approved: "Y"},function(err, reserves) {
    if(err) {
      return next(err);
    }

    res.render('myreservation', {reserves: reserves});
  });
});

module.exports = router;
