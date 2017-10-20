var express = require('express');
var router = express.Router();
var  globals = require('../properties/globals.json');
var  properties = require('../properties/privacy.json');

router.get('/', function(req, res, next) {
  res.render('privacy', {st: properties, globals: globals});
});

module.exports = router;
