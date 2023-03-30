'use strict';

const Joi = require('joi');

// requête createFilm
module.exports = {
    method: 'post',
    path: '/film',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                title: Joi.string().required().min(2).max(300).example('Flobber').description('Green goo on an adventure'),
                description: Joi.string().required().min(25).max(5000).example('Blob blob').description('Description of the film'),
                releaseDate: Joi.date().required().example('2002-01-30').description('Release date of the film'),
                director: Joi.string().required().min(5).max(200).example('Someone').description('Director of the film'),

                type: Joi.string().required().min(2).max(100).example('Comedy').description('Type of the film'),
                duration: Joi.string().required().min(1).max(3).example('90').description('Duration of the film in minutes')
            })
        }
    },
    handler: async (request, h) => {

        const { filmService } = request.services();
        const { mailService } = request.services();
        const { userService } = request.services();

        const mails = await userService.getAllEmails();

        mailService.mailFilmCreation(request.payload, mails);

        return await filmService.create(request.payload);
    }
};
