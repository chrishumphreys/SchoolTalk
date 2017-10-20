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
        if (classToSend != null) {
            classToSend.questions.push(question);

            if (process.env.SEND_EMAIL == 'true') {
                console.log('Sending email...');
                emailService.sendEmail();
            } else {
                console.log('Skipping email as disabled by env param: ', process.env.SEND_EMAIL);
            }

        }
    }

};