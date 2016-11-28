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

router.post('/', function(req, res, next) {
  console.log(req.body.houseName);
  var ses = req.session;
  console.log(ses);
  console.log("---------");
  console.log(ses.passport.user);
  var userId = ses.passport.user;

  User.findById(userId, function(err, getuser) {
    if(err) {
      return next(err);
    }

    var userName = getuser.name;

    var newHotel = new Hotel({
      houseName : req.body.houseName,
      region : req.body.region,
      writer : ses.passport.user,
      introduction : req.body.introduction,
      select : req.body.select,
      price : req.body.price,
      name : userName
    });

    newHotel.save(function(err) {
      if(err) {
        return next(err);
      } else {
        res.redirect('/hotelregister');
      }
    });
  });
});

// router.get('/:id/hotelregister', function(req, res, next) {
//
//   // 넘겨받은 id로 조회한다
//   User.findById(req.params.id, function(err, post) {
//     if (err) {
//       return next(err);
//     }
//     res.render('hotelregister', {post: post}); // 조회된 post를 edit.jade로 넘겨준다
//   });
// });
module.exports = router;
