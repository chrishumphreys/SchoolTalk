var express = require('express');
var router = express.Router();
var  globals = require('../properties/globals.json');
var  properties = require('../properties/faqs.json');

router.get('/', function(req, res, next) {
  res.render('faqs', {st: properties, globals: globals});
});

module.exports = router;
