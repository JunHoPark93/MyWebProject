var express = require('express'),
    User = require('../models/User'),
    Hotel = require('../models/Hotel'),
    Reserve = require('../models/Reserve'),
    moment = require('moment'),
    momentRange = require('moment-range');
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

// 중복 예약 방지 해야 함 id는 hotel의 objectId
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

// ajax receive ---------------------------------------------------
router.put('/check', needAuth, function(req, res, next) {
  console.log('ajax post called');
  var hotelId = req.body.hotelId;
  var dateRange = req.body.dateRange;
  console.log(hotelId);
  console.log(dateRange);

  var response; // 호출된 쪽으로 넘길 것임

  // 꺼내서 예약이 되어있는지 비교
  // find는 배열로넘어오기때문에 length로 체크하고 findone은 하나만 리턴하기때문에 null로 체크한다
  Reserve.find({houseDistinct : hotelId}, function(err, hotels) {
    if(err) {
      next(err);
    } else {
      if(hotels.length === 0) {
        response = {
          status : "none",
          hotels : null
        };
      } else { // 정보가 있는 것
        response = {
          status : "exists",
          hotels : hotels
        };
      }
    }

    console.log(response);
    res.set({'Content-Type': 'text/plain'});
    console.log(response.status);
    res.send({hotels : response});
  });



  //res.send({result:true, msg:msg});

//  res.end(JSON.stringify(response));
});


module.exports = router;
