var express = require('express');
var router = express.Router();
var globals = require('../properties/globals.json');
var properties = require('../properties/parents.json');

var serviceTier = require('../service-tier');



router.get('/', function(req, res, next) {
  var userId = req.cookies.userId;
  res.render('parents', {st : properties, globals: globals, userId:userId});
});

router.get('/schools', function(req, res, next) {
    var pageData =  {
      globals: globals,
      schools: serviceTier.getAllSchools()
    };
    console.log(JSON.stringify(pageData));
    res.render('parents-schools', pageData);
});

router.get('/schools/:schoolId/classes', function(req, res, next) {
    var schoolId = req.params.schoolId;
    var pageData =  {
        globals: globals,
        classes: serviceTier.getClassesForSchool(schoolId)
    };
    console.log("Classes for school: " + schoolId);
    console.log(JSON.stringify(pageData));

    res.render('parents-classes', pageData);
});

router.get('/schools/:schoolId/classes/:classId/subscribe', function(req, res, next) {
    var schoolId = req.params.schoolId;
    var classId = req.params.classId;
    var pageData =  {
        globals: globals,
        schoolClass: serviceTier.getClass(schoolId, classId)
    };
    console.log("ClassId " + classId + " for school " + schoolId);
    console.log(JSON.stringify(pageData));
    res.render('parents-subscribe', pageData);
});

router.post('/schools/:schoolId/classes/:classId/subscribe', function(req, res, next) {
    var schoolId = req.params.schoolId;
    var classId = req.params.classId;

    res.redirect(301, '/parents/schools/' + schoolId + '/classes/' + classId + '/subscribed');
});

router.get('/schools/:schoolId/classes/:classId/subscribed', function(req, res, next) {
    var schoolId = req.params.schoolId;
    var classId = req.params.classId;
    var pageData =  {
        globals: globals,
        schoolClass: serviceTier.getClass(schoolId, classId)
    };
    console.log("ClassId " + classId + " for school " + schoolId);
    console.log(JSON.stringify(pageData));
    res.render('parents-subscribed', pageData);
});

module.exports = router;
