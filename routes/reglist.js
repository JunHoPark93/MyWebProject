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

router.get('/:id', needAuth, function(req, res, next) {
  // db에서 호텔 가져와야 됨
  var name;

  User.findById(req.params.id, function(err,user) {
    if(err) {
      return next(err);
    }
    name = user.name;

// 예약된것들은 제외
    Reserve.find({name:name, approved:{$ne:"Y"}}, function(err, reserves) {
      console.log(reserves);
      console.log(reserves.length);

      // approved = Y이면 뿌리지 않음

      res.render('reglist', {reserves: reserves});
    });
  });
});

// 집 고유번호가 넘어옴
router.post('/approve/:id', function(req, res, next) {
  //console.log(req.params.id);
  var house = req.params.id;
  Reserve.findOneAndUpdate({houseDistinct: house},{$set:{approved:"Y"}}, function(err, house) {

    if(err) {
      return next(err);
    }
    console.log(house);
    res.redirect('/');
    // house.approved = 'Y'; // 예약을 승인한다
    //
    // house.save(function(err) {
    //   if(err) {
    //     return next(err);
    //   }
    //   res.redirect('/');
    // });
  });
});


module.exports = router;
