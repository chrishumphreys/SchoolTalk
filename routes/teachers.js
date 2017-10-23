var express = require('express');
var router = express.Router();
var globals = require('../properties/globals.json');
var properties = require('../properties/teachers.json');

var serviceTier = require('../service-tier');

router.get('/', function(req, res, next) {
  var userId = req.cookies.userId;
  res.render('teachers', {st : properties, globals: globals, userId : userId});
});

var displayTeacherHome = function(req, res, questionForm, next) {
    var userId = req.cookies.userId;
    var teacher = serviceTier.findTeacherByUserId(userId);
    if (teacher == null) {
        res.redirect(302, '/teachers/signin');
    } else {
        res.render('teachers-home', {
            name: teacher.name,
            classes : teacher.classes,
            globals: globals,
            userId: userId,
            question : questionForm
        });
    }
};

var ensureLoggedIn = function(req, res) {
    var userId = req.cookies.userId;
    if (userId == null) {
        res.redirect(302, '/teachers/signin');
        return false;
    }
    return true;
};

router.get('/home', function(req, res, next) {
    if (ensureLoggedIn(req, res)) {
        displayTeacherHome(req, res, null, next);
    }
});

router.get('/signin', function(req, res, next) {
  res.render('teachers-signin', {st : properties, globals: globals});
});

router.get('/signout', function(req, res, next) {
    res.clearCookie('userId');
    res.redirect(302, '/');
});

router.post('/signin', function(req, res, next) {
    var userId = serviceTier.findTeacherByEmail(req.body.email);
    if (userId != null) {
        res.cookie('userId', userId);
        res.redirect(302, '/teachers/home');
    } else {
        res.redirect(302, '/teachers/signin');
    }
});

router.post('/send-question', function(req, res, next) {
    if (ensureLoggedIn(req, res)) {
        var userId = req.cookies.userId;
        var teacher = serviceTier.findTeacherByUserId(userId);
        if (teacher == null) {
            res.redirect(302, '/teachers/signin');
        } else {
            var classToSendTo = req.body.classId;
            console.log("send question", classToSendTo);

            var question = req.body.question;
            if (!question.endsWith('?')) {
                question = question + '?';
            }

            serviceTier.submitQuestion(userId, classToSendTo, {
                question : question,
                hints : req.body.hints,
                links : req.body.references
            });
            res.redirect(302, '/teachers/home');
        }
    }
});

router.get('/signin/forgotten-password', function(req, res, next) {
  res.render('teachers-forgotten-password', {st : properties, globals: globals});
});

router.post('/signin/forgotten-password', function(req, res, next) {
  res.redirect(302, '/teachers/signin');
});

router.get('/question/:classId/:questionId', function(req, res, next){
    if (ensureLoggedIn(req, res)) {
        var userId = req.cookies.userId;
        var classId = req.params.classId;
        var questionId = req.params.questionId;

        var questionData = serviceTier.findQuestion(userId, classId, questionId);

        var questionForm = {
            questionId : questionData.questionId,
            question : questionData.question,
            hints : questionData.hints.join('\r\n'),
            links : questionData.links.join('\r\n')
        };

        console.log('question:')
        console.log(questionForm);

        displayTeacherHome(req, res, questionForm, next);
    }
});

module.exports = router;
