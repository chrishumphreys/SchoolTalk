var emailService = require('./email');

module.exports = {

    allSchools : [
        {
            name : 'Long Hampton Primary',
            logoSmall : '/images/schools/school.png',
            place : 'Hemel Hempstead',
            schoolId : 1
        },
        {
            name : 'Hove Primary',
            logoSmall : '/images/schools/school.png',
            place : 'Brighton',
            schoolId : 2
        }
    ],

    allClasses : {
        '1' : [
            {
                name : 'Class 4D',
                description : 'Class 4D with Miss Taylor',
                classId : 1,
                schoolId : 1
            },
            {
                name : 'Class 2S',
                description : 'Class 2S with Miss Taylor',
                classId : 4,
                schoolId : 1
            }
        ],

        '2': [
            {
                name : 'Class 2K',
                description : 'Class 2K with Mrs Henderson',
                classId : 2,
                schoolId : 2
            },
            {
                name : 'Class 3C',
                description : 'Class 3C with Mr Jones',
                classId : 3,
                schoolId : 2
            }
        ]
    },

    teachers : [
        {
            email : 'jtaylor@longhampton.net',
            name : 'Janet Taylor',
            userId : '1',
            classes : [
                {
                    schoolId: 1,
                    classId:1,
                    className : 'Class 4D',
                    schoolName : 'Long Hampton Primary',

                    questions : [
                        {
                            question : 'How many continents are there?',
                            hints : [ '7', "Asia, Africa, North America, South America, Antarctica, Europe, and Australia"],
                            links : ['https://en.wikipedia.org/wiki/Continent']
                        }
                    ]
                },
                {
                    schoolId: 1,
                    classId:4,
                    className : 'Class 2S',
                    schoolName : 'Long Hampton Primary',

                    questions : [
                        {
                            question : 'Name some primary colours',
                            hints : [ "red", "blue", "green"],
                            links : []
                        }
                    ]
                }
            ]
        }
    ],

    sentEmails : [
        {
            messageId : '123',
            previewUrl : 'https://ethereal.email/message/WeRDtdAsZggwkYhdWesrfw5TyAfEErkDAAAAFiHS.9KUEmxrRLsRKFmX1Dc'
        }
    ],

    getAllSchools : function() {
        return this.allSchools;
    },


    getClassesForSchool : function(schoolId) {
        return this.allClasses[schoolId];
    },

    getClass : function(schoolId, classId) {
        console.log("find class " + classId + ' for schoolId ' + schoolId);

        allClasses = this.getClassesForSchool(schoolId);

        console.log(JSON.stringify(allClasses));


        for (c in allClasses) {
            if (allClasses[c].classId == classId) {
                return allClasses[c];
            }
        }
        console.log("Could not find class");
        return null;
    },

    findTeacherByEmail : function(emailInput) {
        for (var teacherIndex in this.teachers) {
            var email = this.teachers[teacherIndex].email;
            if (email == emailInput) {
                return this.teachers[teacherIndex].userId;
            }
        }
        return null;
    },

    findTeacherByUserId : function(userId) {
        for (var teacherIndex in this.teachers) {
            if (this.teachers[teacherIndex].userId == userId) {
                return this.teachers[teacherIndex];
            }
        }
        return null;
    },

    findClassForTeacher : function(userId, classId) {
        for (teacherIndex in this.teachers) {
            if (this.teachers[teacherIndex].userId == userId) {
                for (var classIndex in this.teachers[teacherIndex].classes) {
                    var teacherClass = this.teachers[teacherIndex].classes[classIndex];
                    if (classId == teacherClass.classId) {
                        return teacherClass;
                    }
                }
            }
        }
        return null;
    },

    submitQuestion : function(userId, classId, question) {
        var classToSend = this.findClassForTeacher(userId, classId);
        var teacher = this.findTeacherByUserId(userId);

        if (classToSend !== null && teacher !== null) {
            var questionData = {
                question : question.question,
                hints : [],
                links : []
            };
            if (question.hints != null) {
                var hints = question.hints.split("\r\n");
                for(var i = 0; i < hints.length; i++ ) {
                    if (hints[i] !== null && hints[i] != '') questionData.hints.push(hints[i]);
                }
            }
            if (question.links != null) {
                var links = question.links.split("\r\n");
                for(var i = 0; i < links.length; i++ ) {
                    if (links[i] !== null && links[i] != '') questionData.links.push(hints[i]);
                }
            }

            classToSend.questions.push(questionData);
            console.log("Question data: " + questionData);

            this.sendQuestionEmails(questionData, classToSend, teacher)
        }
    },

    sendQuestionEmails : function(questionData, classToSend, teacher) {
        if (process.env.SEND_EMAIL == 'true') {
            //TODO loop over all subscribed...

            console.log('Sending email...');
            var emailData = {
                question : questionData.question,
                hints : questionData.hints,
                links : questionData.links,

                to : "chris@schooltalk.org.uk",
                name : "Test user",
                classGroupName : classToSend.className,
                teacherName :teacher.name
            };

            console.log(emailData);

            emailService.sendEmail(emailData,this.handleEtherealMailSendCallback(this.getAllSentEmails()));

        } else {
            console.log('Skipping email as disabled by env param: ', process.env.SEND_EMAIL);
        }
    },

    handleEtherealMailSendCallback : function(sentEmailList) {
        return function(messageId, previewUrl) {
            sentEmailList.push({
               messageId : messageId,
               previewUrl : previewUrl
           });
        };
    },

    getAllSentEmails : function() {
        return this.sentEmails;
    }

};