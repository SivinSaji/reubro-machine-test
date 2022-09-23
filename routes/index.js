var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers')
var collection = require('../config/collections')
const verifyLogin = (req, res, next) => {
  if (req.session.userLoggedIn) {
  
    next()
  } else {
    res.redirect('/login')
  }
}

/* GET home page.*/
router.get('/', async (req, res, next) => {
  let user = req.session.user
    res.render('home', {});

})

/* GET signup page. */
router.get("/signup", function (req, res) {
  if (req.session.user) {
    res.render("user/signup");
  } else {
    res.render('signup', { "usersignUpErr": req.session.usersignUpErr })
    req.session.usersignUpErr = false
  }
})

/* POST signup page. */
router.post("/signup", function (req, res) {
  userHelpers.doSignup(req.body).then((response) => {
    if (response.status == false) {
      req.session.usersignUpErr = "Email Id already exist"
      res.redirect('/signup')
    } else {
      req.session.user = response.user
      req.session.userLoggedIn = true
      res.redirect('/edituser')
    }
  })
})


/* GET login page. */
router.get("/login", function (req, res) {
  if (req.session.user) {
    res.redirect('/')
  } else {
    res.render('login', { "loginErr": req.session.userLoginErr })
    req.session.userLoginErr = false
  }
})

/* POST login page.*/
router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.user = response.user
      req.session.userLoggedIn = true

      res.redirect('/edituser')
    } else {
      req.session.userLoginErr = "Invalid username or password"
      res.redirect('/login')
    }
  })
})
/* GET home page. */
router.get('/edituser', function(req, res, next) {
  res.render('edituser', {});
});
module.exports = router;
