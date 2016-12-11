var express = require('express'),
    User = require('../models/User'),
    Hotel = require('../models/Hotel'),
    Favorite = require('../models/Favorite');

var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("auth");
    next();
  } else {
    res.status(401).json({message: 'Not authorized'});
  }
}

// router.get('/', function(req, res, next) {
//   res.render('favorite');
// });

// favorite 모델에서 찾아야 되
router.get('/:id', needAuth, function(req, res, next) {

  Favorite.find({user_id: req.params.id}, function(err, hotel) {
    if(err) {
      return next(err);
    }
    console.log(hotel);
    res.render('favorite', {hotels: hotel});
  });
});

router.post('/:id', needAuth, function(req, res, next) {

  console.log("Favorite ajax called");
  var ses = req.session;
  var userId = ses.passport.user;

  var hotelDistinct = req.params.id;
  console.log(hotelDistinct);

  var houseName;
  var price;
  var introduction;

  Hotel.find({_id: hotelDistinct}, function(err, hotel){
    if(err) {
      next(err);
    }

    houseName = hotel[0].houseName;
    price = hotel[0].price;
    introduction = hotel[0].introduction;

    Favorite.find({user_id: userId, hotelDistinct: hotelDistinct}, function(err, favorite) {
        if(err) {
          next(err);
        }

  // 즐겨찾기가 안되어있다면
        if(favorite.length === 0) {
          var fav = new Favorite({
            hotelDistinct: hotelDistinct,
            user_id: userId,
            houseName: houseName,
            price: price,
            introduction: introduction
          });

          console.log("here");

          fav.save(function(err) {
            if(err){
              next(err);
            }
            res.redirect('/');
          });
        } else {
          // 즐겨찾기가 되어있는 것
        }
    });
  });









  //res.redirect('/');
});




module.exports = router;
