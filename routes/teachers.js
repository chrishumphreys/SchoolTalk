var express = require('express');
var router = express.Router();
var globals = require('../properties/globals.json');
var properties = require('../properties/teachers.json');

router.get('/', function(req, res, next) {
  res.render('teachers', {st : properties, globals: globals});
});

router.get('/home', function(req, res, next) {
  res.render('teachers-home', { name: 'Janet', globals: globals });
});

router.get('/signin', function(req, res, next) {
  res.render('teachers-signin', {st : properties, globals: globals});
})

router.post('/signin', function(req, res, next) {
    res.redirect(301, '/teachers/home');
})

router.get('/signin/forgotten-password', function(req, res, next) {
  res.render('teachers-forgotten-password', {st : properties, globals: globals});
})

router.post('/signin/forgotten-password', function(req, res, next) {
  res.redirect(301, '/teachers/signin');
});

module.exports = router;
