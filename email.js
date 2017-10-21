'use strict';
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
var  properties = require('./properties/email.json');


module.exports = {

    "sendEmail" : function(emailData, debugSentEmailCallback) {
        var data = {
            subject: properties.email.subject,
            from: properties.email.from,
            to : emailData.to,
            name : emailData.name,
            question : emailData.question,
            hints : emailData.hints,
            links : emailData.links,
            teacherName : emailData.teacherName,
            classGroupName : emailData.classGroupName,

            text : "test test",  //TODO fix me
            st : properties
        };

        var template_path = path.join(__dirname, 'emails');
        var html_email = path.join(template_path, 'standard-html.hbs');

        fs.readFile(html_email, 'utf-8', function(error, source){
            var template = handlebars.compile(source);
            var html = template(data);
//            console.log("************************ sending email ***********************")
            //console.log(html);
//            console.log("**************************************************************")
            data.html = html;

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

                debugSentEmailCallback(info.messageId, nodemailer.getTestMessageUrl(info));
            };

            transporter.sendMail(mailOptions, callback);

        });
    }


};
