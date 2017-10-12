var express = require('express');
var  router = express.Router();
var  properties = require('../properties/about.json');
var  globals = require('../properties/globals.json');

router.get('/', function(req, res, next) {
  var userId = req.cookies.userId;
  res.render('about', {st: properties, globals: globals, userId: userId});
});

module.exports = router;
