var express = require('express');
var router = express.Router();
var  globals = require('../properties/globals.json');

/* GET home page. */
router.get('/', function(req, res, next) {
    var userId = req.cookies.userId;
    console.log("userId", userId);
    if (userId == null) {
        res.render('index', { globals: globals });
    } else {
        res.redirect(302, '/teachers/home');
    }
});

module.exports = router;
