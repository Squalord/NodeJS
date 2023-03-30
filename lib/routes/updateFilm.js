'use strict';

const Joi = require('joi');

// requête createFilm
module.exports = {
    method: 'patch',
    path: '/film',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                id: Joi.number().integer().min(1).description('Id of the film'),
                title: Joi.string().required().min(2).max(300).example('Flobberes').description('Title of the film'),
                description: Joi.string().required().min(25).max(5000).example('All green').description('Description of the film'),
                releaseDate: Joi.date().required().example('2002-01-30').description('Release date of the film'),
                director: Joi.string().required().min(5).max(200).example('Someone').description('Director of the film'),

                type: Joi.string().required().min(2).max(100).example('Comedy').description('Type of the film'),
                duration: Joi.string().required().min(1).max(3).example('90').description('Duration of the film in minutes')

            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();
        const { filmService } = request.services();
        const { mailService } = request.services();

        const mails = await userService.getAllEmailsHavingFilmInFavorite(request.payload.id);

        await mailService.mailFilmUpdate(request.payload, mails);

        return await filmService.update(request.payload);
    }
};
