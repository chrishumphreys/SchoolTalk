module.exports = {

    allSchools : [
        {
            name : 'Long Hampton Primary',
            logoSmall : '/images/schools/course-tile-pre-reader-express.png',
            place : 'Hemel Hempstead',
            schoolId : 1
        },
        {
            name : 'Hove Primary',
            logoSmall : '/images/schools/course-tile-pre-reader-express.png',
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
            email : 'taylor',
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
    }



};