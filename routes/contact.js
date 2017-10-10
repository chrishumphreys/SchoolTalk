var express = require('express');
var router = express.Router();
var  globals = require('../properties/globals.json');
var  properties = require('../properties/contact.json');

router.get('/', function(req, res, next) {
  res.render('contact', {st : properties, globals: globals});
});

module.exports = router;
