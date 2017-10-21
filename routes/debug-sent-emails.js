var express = require('express');
var router = express.Router();
var  globals = require('../properties/globals.json');

var serviceTier = require('../service-tier');

router.get('/', function(req, res, next) {
    var userId = req.cookies.userId;
    if (userId == null) {
        res.redirect(302, '/teachers/signin');
    } else {
        var sentEmails = serviceTier.getAllSentEmails();
        console.log(sentEmails);
        res.render('debug-sent-emails', {sentEmails: sentEmails, globals: globals});
    }
});

module.exports = router;
