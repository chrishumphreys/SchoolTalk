var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('teachers', { });
});

router.get('/home', function(req, res, next) {
  res.render('teachers-home', { name: 'Janet' });
});

router.get('/signin', function(req, res, next) {
  res.render('teachers-signin', { });
})

router.post('/signin', function(req, res, next) {
    res.redirect(301, '/teachers/home');
})

router.get('/signin/forgotten-password', function(req, res, next) {
  res.render('teachers-forgotten-password', { });
})

router.post('/signin/forgotten-password', function(req, res, next) {
  res.redirect(301, '/teachers/signin');
});

module.exports = router;
