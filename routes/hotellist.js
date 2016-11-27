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

router.get('/', function (req, res, next) {
  console.log('hotellist.js진입');
});
