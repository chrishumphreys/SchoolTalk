var express = require('express');
var router = express.Router();
var  globals = require('../properties/globals.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { globals: globals });
});

module.exports = router;
