'use strict';

const { Service } = require('@hapipal/schmervice');

// eslint-disable-next-line @hapi/hapi/capitalize-modules
const nodemailer = require('nodemailer');

module.exports = class MailService extends Service {

    async mailUserCreation(user) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        const testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass // generated ethereal password
            }
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Maxime NGUYEN" <noreply@node.com>', // sender address
            to: user.mail, // list of receivers
            subject: 'Account created', // Subject line
            text: 'Congrats ' + user.firstName + ' !\r\nYou made it !', // plain text body
            html: '<p>Congrats <b>' + user.firstName + '</b> !</p>  !\r\nYou made it !</p>' // html body
        });

        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }


    async mailFilmCreation(film, mails) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        const testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass // generated ethereal password
            }
        });

        let listMails = '';
        // eslint-disable-next-line @hapi/hapi/for-loop
        for (let i = 0; i <= mails.length - 1; i++) {
            if (i === mails.length - 1) {
                listMails += mails[i].mail;
            }
            else {
                listMails += mails[i].mail + ', ';
            }

        }

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Maxime NGUYEN" <noreply@node.com>', // sender address
            to: listMails, // list of receivers
            subject: 'New movie published', // Subject line
            text: 'Check it out ' + film.title , // plain text body
            html: '<p>Check it out <b>' + film.title // html body
        });

        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }


    async mailFilmUpdate(film, mails) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        const testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass // generated ethereal password
            }
        });

        let listMails = '';
        // eslint-disable-next-line @hapi/hapi/for-loop
        for (let i = 0; i <= mails.length - 1; i++) {
            if (i === mails.length - 1) {
                listMails += mails[i].mail;
            }
            else {
                listMails += mails[i].mail + ', ';
            }
        }

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Maxime NGUYEN" <noreply@node.com>', // sender address
            to: listMails, // list of receivers
            subject: 'Movie added to favorite', // Subject line
            text: 'You have added the movie ' + film.title, // plain text body
            html: '<p>You have added the movie <b>' + film.title + '</b>' // html body
        });

        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
};
