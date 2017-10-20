'use strict';
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');


module.exports = {


    "sendEmail" : function() {


        var data = {
            subject: 'Test email from SchoolTalk.org.uk',
            from: 'replies@schooltalk.org.uk',
            to : "chris@schooltalk.org.uk",
            question : 'a sample question',
            hints : ["hint1", "hint2", "hint3"],
            references : ["link1", "link2"],
            text : "test test"
        };

        var template_path = path.join(__dirname, 'emails');
        var html_email = path.join(template_path, 'standard-html.hbs');

        fs.readFile(html_email, 'utf-8', function(error, source){
            var template = handlebars.compile(source);
            var html = template(data);
            console.log("************************ sending email ***********************")
            console.log(html);
            console.log("**************************************************************")
            data.html = html;
        });

        if (true) {

            var transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });

            // setup email data with unicode symbols
            var mailOptions = {
                from: data.from, // sender address
                to: data.to, // list of receivers
                subject: data.subject, // Subject line
                text: data.text, // plain text body
                html: data.html // html body
            };

            var callback = function(error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            };

            transporter.sendMail(mailOptions, callback);

        }
    }


};
