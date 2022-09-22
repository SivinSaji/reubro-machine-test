var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {});
});

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', {});
});


/* GET home page. */
router.get('/signup', function(req, res, next) {
  res.render('signup', {});
});

/* GET home page. */
router.get('/edituser', function(req, res, next) {
  res.render('edituser', {});
});
module.exports = router;
