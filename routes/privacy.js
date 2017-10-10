var express = require('express');
var router = express.Router();
var  globals = require('../properties/globals.json');

router.get('/', function(req, res, next) {
  res.render('privacy', {globals: globals});
});

module.exports = router;
